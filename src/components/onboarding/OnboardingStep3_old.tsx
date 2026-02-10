import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check, Plus, Trash2, Loader2, Code, Briefcase } from 'lucide-react';
import type { OnboardingStep3 as Step3Type, AcademicPerformance, WorkExperience, CompetitiveProfile } from '@/lib/onboarding.types';
import { MONTHS, getYearsArray, CLASS_12_BOARDS, COMPETITIVE_PLATFORMS, TECH_STACK } from '@/lib/onboarding.mockData';

interface OnboardingStep3Props {
  initialData?: Partial<Step3Type>;
  onNext: (data: Step3Type) => void;
  onSkip: () => void;
  onBack?: () => void;
  onFieldChange?: (data: Step3Type) => void;
}

const CGPAPercentageConverter: React.FC<{
  format: 'CGPA' | 'Percentage';
  cgpa?: number;
  percentage?: number;
  onCGPAChange: (cgpa: number) => void;
  onPercentageChange: (percentage: number) => void;
}> = ({ format, cgpa, percentage, onCGPAChange, onPercentageChange }) => {
  const convertCGPAToPercentage = (cgpa: number) => Math.round(cgpa * 9.5);
  const convertPercentageToGPA = (percentage: number) => (percentage / 9.5).toFixed(2);

  return (
    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg space-y-2">
      <div className="font-medium text-foreground">Quick Converter:</div>
      {format === 'CGPA' && cgpa ? (
        <div>
          CGPA {cgpa} ≈ {convertCGPAToPercentage(cgpa)}%
          <button
            type="button"
            onClick={() => onPercentageChange(convertCGPAToPercentage(cgpa))}
            className="ml-2 text-primary hover:underline text-xs"
          >
            Use this percentage
          </button>
        </div>
      ) : format === 'Percentage' && percentage ? (
        <div>
          {percentage}% ≈ {convertPercentageToGPA(percentage)} CGPA
          <button
            type="button"
            onClick={() => onCGPAChange(parseFloat(convertPercentageToGPA(percentage)))}
            className="ml-2 text-primary hover:underline text-xs"
          >
            Use this CGPA
          </button>
        </div>
      ) : null}
    </div>
  );
};

export const OnboardingStep3Component: React.FC<OnboardingStep3Props> = ({
  initialData,
  onNext,
  onSkip,
  onBack,
  onFieldChange,
}) => {
  const [hasInternship, setHasInternship] = useState(initialData?.hasInternshipExperience ?? false);
  const [academicData, setAcademicData] = useState<AcademicPerformance>(
    initialData?.academicPerformance || { marksFormat: 'CGPA' }
  );
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(initialData?.workExperiences || []);
  const [competitiveProfiles, setCompetitiveProfiles] = useState<CompetitiveProfile[]>(
    initialData?.competitiveProfiles || COMPETITIVE_PLATFORMS.map((p) => ({ platform: p.name as any, isVerified: false }))
  );
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({});
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [verifyingPlatform, setVerifyingPlatform] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const years = getYearsArray(1990);
  
  // Auto-save form data on change
  useEffect(() => {
    if (onFieldChange) {
      onFieldChange({
        academicPerformance: academicData,
        workExperiences,
        competitiveProfiles,
        hasInternshipExperience: hasInternship,
      });
    }
  }, [academicData, workExperiences, competitiveProfiles, hasInternship]);

  const validateAcademic = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (academicData.marksFormat === 'CGPA' && (!academicData.cgpa || academicData.cgpa < 0 || academicData.cgpa > 10)) {
      newErrors.cgpa = 'Enter a valid CGPA between 0.0 and 10.0';
    }
    if (academicData.marksFormat === 'Percentage' && (!academicData.percentage || academicData.percentage < 0 || academicData.percentage > 100)) {
      newErrors.percentage = 'Enter a valid percentage between 0 and 100';
    }
    if (academicData.class12Percentage !== undefined && (academicData.class12Percentage < 0 || academicData.class12Percentage > 100)) {
      newErrors.class12Percentage = 'Enter a valid percentage between 0 and 100';
    }
    if (academicData.class10Marks !== undefined && (academicData.class10Marks < 0 || academicData.class10Marks > 100)) {
      newErrors.class10Marks = 'Enter valid marks';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExperience = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!newExperience.companyName?.trim()) newErrors.companyName = 'Company name is required';
    if (!newExperience.role?.trim()) newErrors.role = 'Role is required';
    if (!newExperience.startDate?.month || !newExperience.startDate?.year) {
      newErrors.startDate = 'Start date is required';
    }
    if (newExperience.workMode === 'On-site' && !newExperience.city?.trim()) {
      newErrors.city = 'City is required for on-site work';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExperience = () => {
    if (validateExperience()) {
      const experience: WorkExperience = {
        id: Date.now().toString(),
        companyName: newExperience.companyName || '',
        role: newExperience.role || '',
        startDate: newExperience.startDate || { month: '', year: '' },
        endDate: newExperience.endDate,
        isCurrentlyWorking: newExperience.isCurrentlyWorking || false,
        workMode: newExperience.workMode || 'Remote',
        city: newExperience.city,
        responsibilities: newExperience.responsibilities,
        technologiesUsed: newExperience.technologiesUsed,
      };
      setWorkExperiences((prev) => [...prev, experience]);
      setNewExperience({});
      setIsAddingExperience(false);
      setErrors({});
    }
  };

  const handleRemoveExperience = (id: string) => {
    setWorkExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleVerifyProfile = async (platform: string) => {
    setVerifyingPlatform(platform);
    const profile = competitiveProfiles.find((p) => p.platform === platform);
    if (profile?.username) {
      // Simulate API call
      setTimeout(() => {
        setCompetitiveProfiles((prev) =>
          prev.map((p) =>
            p.platform === platform
              ? {
                  ...p,
                  isVerified: true,
                  problemsSolved: Math.floor(Math.random() * 500) + 50,
                  rating: Math.floor(Math.random() * 2200) + 800,
                  lastVerifiedAt: new Date().toISOString(),
                }
              : p
          )
        );
        setVerifyingPlatform(null);
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAcademic()) {
      onNext({
        academicPerformance: academicData,
        workExperiences,
        competitiveProfiles,
        hasInternshipExperience: hasInternship,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
          {/* Academic Performance */}
          <div className="space-y-4 pb-8">
              <div className="space-y-2">
                <Label className="font-medium">Marks Format</Label>
                <div className="flex gap-3">
                  {['CGPA', 'Percentage'].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => {
                        setAcademicData((prev) => ({
                          ...prev,
                          marksFormat: format as 'CGPA' | 'Percentage',
                        }));
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        academicData.marksFormat === format
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background hover:border-primary'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* CGPA or Percentage */}
              {academicData.marksFormat === 'CGPA' ? (
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA (0.0 - 10.0)</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="8.5"
                    value={academicData.cgpa || ''}
                    onChange={(e) =>
                      setAcademicData((prev) => ({
                        ...prev,
                        cgpa: parseFloat(e.target.value) || undefined,
                      }))
                    }
                    className={errors.cgpa ? 'border-destructive' : ''}
                  />
                  {errors.cgpa && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cgpa}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage (0 - 100)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    value={academicData.percentage || ''}
                    onChange={(e) =>
                      setAcademicData((prev) => ({
                        ...prev,
                        percentage: parseInt(e.target.value) || undefined,
                      }))
                    }
                    className={errors.percentage ? 'border-destructive' : ''}
                  />
                  {errors.percentage && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.percentage}
                    </p>
                  )}
                </div>
              )}

              {(academicData.cgpa || academicData.percentage) && (
                <CGPAPercentageConverter
                  format={academicData.marksFormat}
                  cgpa={academicData.cgpa}
                  percentage={academicData.percentage}
                  onCGPAChange={(cgpa) => {
                    setAcademicData((prev) => ({ ...prev, cgpa }));
                  }}
                  onPercentageChange={(percentage) => {
                    setAcademicData((prev) => ({ ...prev, percentage }));
                  }}
                />
              )}

              {/* Class 12 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="class12Percentage">Class 12 Percentage (Optional)</Label>
                  <Input
                    id="class12Percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="90"
                    value={academicData.class12Percentage || ''}
                    onChange={(e) => {
                      setAcademicData((prev) => ({
                        ...prev,
                        class12Percentage: parseInt(e.target.value) || undefined,
                      }));
                    }}
                    className={errors.class12Percentage ? 'border-destructive' : ''}
                  />
                  {errors.class12Percentage && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.class12Percentage}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class12Board">Class 12 Board (Optional)</Label>
                  <Select
                    value={academicData.class12Board || ''}
                    onValueChange={(value) =>
                      setAcademicData((prev) => ({ ...prev, class12Board: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASS_12_BOARDS.map((board) => (
                        <SelectItem key={board} value={board}>
                          {board}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class10Marks">Class 10 Marks (Optional)</Label>
                  <Input
                    id="class10Marks"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="95"
                    value={academicData.class10Marks || ''}
                    onChange={(e) =>
                      setAcademicData((prev) => ({
                        ...prev,
                        class10Marks: parseInt(e.target.value) || undefined,
                      }))
                    }
                    className={errors.class10Marks ? 'border-destructive' : ''}
                  />
                  {errors.class10Marks && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.class10Marks}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">Out of 100</p>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4 pb-8">
              {/* Have Internship Toggle */}
              <div className="space-y-2">
                <Label className="font-medium">Have you done any internships or jobs?</Label>
                <div className="flex gap-3">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setHasInternship(option === 'Yes')}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        (option === 'Yes' ? hasInternship : !hasInternship)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background hover:border-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Form */}
              {hasInternship && (
                <>
                  {!isAddingExperience && workExperiences.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingExperience(true)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  )}

                  {isAddingExperience && (
                    <Card className="bg-muted/50 border-border/30 p-4 space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            placeholder="Google"
                            value={newExperience.companyName || ''}
                            onChange={(e) =>
                              setNewExperience((prev) => ({ ...prev, companyName: e.target.value }))
                            }
                            className={errors.companyName ? 'border-destructive' : ''}
                          />
                          {errors.companyName && (
                            <p className="text-xs text-destructive">{errors.companyName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Role / Title *</Label>
                          <Input
                            id="role"
                            placeholder="Software Engineer Intern"
                            value={newExperience.role || ''}
                            onChange={(e) =>
                              setNewExperience((prev) => ({ ...prev, role: e.target.value }))
                            }
                            className={errors.role ? 'border-destructive' : ''}
                          />
                          {errors.role && (
                            <p className="text-xs text-destructive">{errors.role}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <div className="flex gap-2">
                            <Select
                              value={newExperience.startDate?.month || ''}
                              onValueChange={(value) =>
                                setNewExperience((prev) => ({
                                  ...prev,
                                  startDate: { ...prev.startDate, month: value },
                                }))
                              }
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {MONTHS.map((m) => (
                                  <SelectItem key={m} value={m}>
                                    {m}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={newExperience.startDate?.year || ''}
                              onValueChange={(value) =>
                                setNewExperience((prev) => ({
                                  ...prev,
                                  startDate: { ...prev.startDate, year: value },
                                }))
                              }
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((y) => (
                                  <SelectItem key={y} value={y}>
                                    {y}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.startDate && (
                            <p className="text-xs text-destructive">{errors.startDate}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={newExperience.isCurrentlyWorking || false}
                              onChange={(e) =>
                                setNewExperience((prev) => ({
                                  ...prev,
                                  isCurrentlyWorking: e.target.checked,
                                }))
                              }
                            />
                            Currently Working Here
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-medium">Work Mode *</Label>
                        <div className="flex gap-3">
                          {['Remote', 'On-site'].map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() =>
                                setNewExperience((prev) => ({ ...prev, workMode: mode as any }))
                              }
                              className={`px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                                newExperience.workMode === mode
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border bg-background hover:border-primary'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {newExperience.workMode === 'On-site' && (
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="Bangalore"
                            value={newExperience.city || ''}
                            onChange={(e) =>
                              setNewExperience((prev) => ({ ...prev, city: e.target.value }))
                            }
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && (
                            <p className="text-xs text-destructive">{errors.city}</p>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="responsibilities">Responsibilities (Optional)</Label>
                        <Textarea
                          id="responsibilities"
                          placeholder="• Developed features using React&#10;• Fixed bugs in production&#10;• Collaborated with team"
                          value={newExperience.responsibilities || ''}
                          onChange={(e) =>
                            setNewExperience((prev) => ({
                              ...prev,
                              responsibilities: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsAddingExperience(false);
                            setNewExperience({});
                            setErrors({});
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="button" onClick={handleAddExperience} className="ml-auto">
                          Add Experience
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Existing Experiences */}
                  <div className="space-y-2">
                    {workExperiences.map((exp) => (
                      <Card key={exp.id} className="p-3 border-border/50">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{exp.role}</h4>
                              <p className="text-sm text-muted-foreground">{exp.companyName}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveExperience(exp.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {exp.startDate.month} {exp.startDate.year} →{' '}
                            {exp.isCurrentlyWorking ? 'Present' : `${exp.endDate?.month} ${exp.endDate?.year}`}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {exp.workMode} {exp.city && `• ${exp.city}`}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Competitive Profiles */}
            <div className="space-y-4 pb-8">
              <div className="space-y-3">
                {competitiveProfiles.map((profile) => (
                  <div key={profile.platform} className="space-y-2 p-3 bg-muted/50 rounded-lg border border-border/30">
                    <Label className="font-medium">{profile.platform}</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder={`${profile.platform} username`}
                        value={profile.username || ''}
                        onChange={(e) =>
                          setCompetitiveProfiles((prev) =>
                            prev.map((p) =>
                              p.platform === profile.platform
                                ? { ...p, username: e.target.value }
                                : p
                            )
                          )
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyProfile(profile.platform)}
                        disabled={!profile.username || verifyingPlatform === profile.platform}
                      >
                        {verifyingPlatform === profile.platform && (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        {profile.isVerified ? <Check className="w-4 h-4 mr-2 text-success" /> : null}
                        {profile.isVerified ? 'Verified' : 'Verify'}
                      </Button>
                    </div>
                    {profile.isVerified && profile.problemsSolved && (
                      <p className="text-xs text-success">
                        ✓ {profile.problemsSolved} problems solved • Rating: {profile.rating}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border/30">
              {onBack && (
                <Button variant="outline" onClick={onBack} type="button" className="flex-1 md:flex-none">
                  Back
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={onSkip}
                type="button"
                className="flex-1 md:flex-none"
              >
                Skip For Now
              </Button>
              <Button type="submit" className="flex-1 md:flex-none ml-auto">
                Save & Next
              </Button>
            </div>
          </form>
    );
  };

export default OnboardingStep3Component;
