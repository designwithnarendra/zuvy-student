import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Check, AlertCircle, ChevronDown, User, Phone, Mail, GraduationCap, Linkedin } from 'lucide-react';
import type { OnboardingStep1 as Step1Type } from '@/lib/onboarding.types';
import { COLLEGES, DEGREES, getBranchesByDegree } from '@/lib/onboarding.mockData';
import { mockStudent } from '@/lib/mockData';

interface OnboardingStep1Props {
  initialData?: Partial<Step1Type>;
  userEmail?: string;
  userFullName?: string;
  onNext: (data: Step1Type) => void;
  onSkip: () => void;
  onBack?: () => void;
  onFieldChange?: (data: Step1Type) => void;
}

export const OnboardingStep1Component: React.FC<OnboardingStep1Props> = ({
  initialData,
  userEmail = '',
  userFullName = '',
  onNext,
  onSkip,
  onBack,
  onFieldChange,
}) => {
  // Auto-fill email from mockStudent if no userEmail passed
  const resolvedEmail = userEmail || mockStudent.email || '';

  const [formData, setFormData] = useState<Step1Type>({
    fullName: initialData?.fullName || userFullName || '',
    email: initialData?.email || resolvedEmail,
    phoneNumber: initialData?.phoneNumber || '',
    linkedin: initialData?.linkedin || '',
    collegeName: initialData?.collegeName || '',
    customCollege: initialData?.customCollege || '',
    degree: initialData?.degree || '',
    branch: initialData?.branch || '',
    yearOfStudy: initialData?.yearOfStudy || '1st',
    graduationDate: typeof initialData?.graduationDate === 'string' ? initialData?.graduationDate : '',
    currentStatus: initialData?.currentStatus || 'Learning',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [collegeSearch, setCollegeSearch] = useState('');
  const [filteredColleges, setFilteredColleges] = useState(COLLEGES);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [validations, setValidations] = useState<Record<string, boolean>>({});

  const collegeDropdownRef = useRef<HTMLDivElement>(null);
  const graduationDateRef = useRef<HTMLInputElement>(null);

  const branches = formData.degree ? getBranchesByDegree(formData.degree) : [];

  // Auto-save form data on change
  useEffect(() => {
    if (onFieldChange) {
      onFieldChange(formData);
    }
  }, [formData]);

  // Filter colleges based on search
  useEffect(() => {
    if (collegeSearch.trim()) {
      const filtered = COLLEGES.filter(
        (college) =>
          college.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
          college.state.toLowerCase().includes(collegeSearch.toLowerCase())
      );
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges(COLLEGES);
    }
  }, [collegeSearch]);

  // Close college dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (collegeDropdownRef.current && !collegeDropdownRef.current.contains(event.target as Node)) {
        setShowCollegeDropdown(false);
      }
    };

    if (showCollegeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCollegeDropdown]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.linkedin.trim()) {
      newErrors.linkedin = 'LinkedIn Profile is required';
    }

    if (!formData.collegeName && !formData.customCollege) {
      newErrors.college = 'College selection is required';
    }

    if (!formData.degree) {
      newErrors.degree = 'Degree is required';
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch selection is required';
    }

    if (!formData.graduationDate) {
      newErrors.graduationDate = 'Graduation date is required';
    } else {
      const selectedDate = new Date(formData.graduationDate);
      const today = new Date();
      if (selectedDate <= today) {
        newErrors.graduationDate = 'Graduation date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'phoneNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
      if (processedValue.length === 10) {
        setValidations((prev) => ({ ...prev, phoneNumber: validatePhoneNumber(processedValue) }));
      } else {
        setValidations((prev) => ({ ...prev, phoneNumber: false }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCollegeSelect = (collegeName: string) => {
    setFormData((prev) => ({ ...prev, collegeName, customCollege: '' }));
    setShowCollegeDropdown(false);
    setCollegeSearch('');
  };

  const handleCustomCollege = () => {
    setFormData((prev) => ({ ...prev, collegeName: '', customCollege: collegeSearch }));
    setShowCollegeDropdown(false);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'degree') {
      setFormData((prev) => ({ ...prev, degree: value, branch: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  // Open the native date picker on any click on the field area
  const openDatePicker = () => {
    if (graduationDateRef.current) {
      graduationDateRef.current.showPicker?.();
      graduationDateRef.current.focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Card 1: Personal Details ── */}
        <Card className="border-border/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur">
          <CardContent className="pb-6">
            <div className="flex items-center gap-2 mb-6 bg-muted -mx-6 px-6 py-3 rounded-t-md">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold uppercase tracking-wide">Personal Details</h3>
            </div>

            <div className="space-y-6">
              {/* Row 1: Full Name + Phone Number */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className={`pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className={`pl-10 ${errors.phoneNumber ? 'border-destructive' : ''}`}
                    />
                    {validations.phoneNumber && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                    )}
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email + LinkedIn */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Email (auto-filled, read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="pl-10 opacity-60 cursor-not-allowed"
                    />
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="font-medium">
                    LinkedIn Profile <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      name="linkedin"
                      placeholder="linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className={`pl-10 ${errors.linkedin ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.linkedin && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.linkedin}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Card 2: Education ── */}
        <Card className="border-border/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur">
          <CardContent className="pb-6">
            <div className="flex items-center gap-2 mb-6 bg-muted -mx-6 px-6 py-3 rounded-t-md">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold uppercase tracking-wide">Education</h3>
            </div>

            <div className="space-y-6">
              {/* College (full width) */}
              <div className="space-y-2">
                <Label className="font-medium">
                  College <span className="text-destructive">*</span>
                </Label>
                <div className="relative" ref={collegeDropdownRef}>
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Input
                    placeholder="Search for your college..."
                    value={formData.collegeName || formData.customCollege || collegeSearch}
                    onChange={(e) => {
                      setCollegeSearch(e.target.value);
                      setShowCollegeDropdown(true);
                      if (formData.collegeName || formData.customCollege) {
                        setFormData((prev) => ({ ...prev, collegeName: '', customCollege: '' }));
                      }
                    }}
                    onFocus={() => {
                      setShowCollegeDropdown(true);
                      if (formData.collegeName || formData.customCollege) {
                        setCollegeSearch('');
                      }
                    }}
                    className={`pl-10 ${errors.college ? 'border-destructive' : ''}`}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />

                  {showCollegeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                      {filteredColleges.map((college) => (
                        <button
                          key={college.id}
                          type="button"
                          onClick={() => handleCollegeSelect(college.name)}
                          className="w-full text-left px-3 py-2 hover:bg-accent text-sm hover:text-accent-foreground transition-colors"
                        >
                          <div className="font-medium">{college.name}</div>
                          <div className="text-xs text-muted-foreground">{college.state}</div>
                        </button>
                      ))}
                      {collegeSearch.trim() && filteredColleges.length === 0 && (
                        <button
                          type="button"
                          onClick={handleCustomCollege}
                          className="w-full text-left px-3 py-2 hover:bg-accent text-sm hover:text-accent-foreground transition-colors border-t border-border/30"
                        >
                          <div className="font-medium text-primary">Add "{collegeSearch}" as custom college</div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {errors.college && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.college}
                  </p>
                )}
              </div>

              {/* Row: Degree + Branch */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="font-medium">
                    Degree <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.degree || ''} onValueChange={(value) => handleSelectChange('degree', value)}>
                    <SelectTrigger className={errors.degree ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEGREES.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.degree && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.degree}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch" className="font-medium">
                    Branch <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.branch || ''}
                    onValueChange={(value) => handleSelectChange('branch', value)}
                    disabled={!formData.degree}
                  >
                    <SelectTrigger className={errors.branch ? 'border-destructive' : ''}>
                      <SelectValue placeholder={formData.degree ? 'Select Branch' : 'Select degree first'} />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.branch && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.branch}
                    </p>
                  )}
                </div>
              </div>

              {/* Row: Year of Study + Graduation Date */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Year of Study */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    Year of Study <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1st', '2nd', '3rd', '4th'].map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, yearOfStudy: year as any }))}
                        className={`py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                          formData.yearOfStudy === year
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background hover:border-primary'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Graduation Date — clicking anywhere on the field opens the picker */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    Graduation Date <span className="text-destructive">*</span>
                  </Label>
                  {/* Wrapper acts as the visible field; native input is hidden but functional */}
                  <div
                    className={`relative flex items-center h-10 rounded-md border bg-background px-3 cursor-pointer ${
                      errors.graduationDate ? 'border-destructive' : 'border-input'
                    }`}
                    onClick={openDatePicker}
                  >
                    <span className={`flex-1 text-sm ${formData.graduationDate ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {formData.graduationDate
                        ? new Date(formData.graduationDate + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        : 'Select graduation date'}
                    </span>
                    {/* The native date input is invisible but still renders — positioned to receive events */}
                    <input
                      ref={graduationDateRef}
                      type="date"
                      name="graduationDate"
                      value={formData.graduationDate || ''}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, graduationDate: e.target.value }));
                        if (errors.graduationDate) {
                          setErrors((prev) => { const n = { ...prev }; delete n.graduationDate; return n; });
                        }
                      }}
                      className="absolute inset-0 opacity-0 w-full cursor-pointer"
                      tabIndex={-1}
                    />
                  </div>
                  {errors.graduationDate && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.graduationDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Current Status */}
              <div className="space-y-2">
                <Label className="font-medium">
                  Current Status <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Learning', 'Looking for Job', 'Working'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, currentStatus: status as any }))}
                      className={`py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                        formData.currentStatus === status
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background hover:border-primary'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </form>
    </>
  );
};

export default OnboardingStep1Component;
