'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface Step1Data {
  company: string
  role: string
}

interface Step2Data {
  teamSize: string
  industry: string
}

interface Step3Data {
  goals: string[]
}

interface FormErrors {
  company?: string
  role?: string
  teamSize?: string
  industry?: string
  goals?: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [step1Data, setStep1Data] = useState<Step1Data>({ company: '', role: '' })
  const [step2Data, setStep2Data] = useState<Step2Data>({ teamSize: '', industry: '' })
  const [step3Data, setStep3Data] = useState<Step3Data>({ goals: [] })
  const [errors, setErrors] = useState<FormErrors>({})

  // Manual validation for Step 1
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!step1Data.company.trim()) {
      newErrors.company = 'Company name is required'
    } else if (step1Data.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters'
    }

    if (!step1Data.role.trim()) {
      newErrors.role = 'Role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manual validation for Step 2
  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!step2Data.teamSize) {
      newErrors.teamSize = 'Please select your team size'
    }

    if (!step2Data.industry.trim()) {
      newErrors.industry = 'Industry is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manual validation for Step 3
  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {}

    if (step3Data.goals.length === 0) {
      newErrors.goals = 'Please select at least one goal'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStep1Data(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStep2Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setStep2Data(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const toggleGoal = (goal: string) => {
    setStep3Data(prev => ({
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
    setErrors(prev => ({ ...prev, goals: undefined }))
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep3()) {
      return
    }

    // Store onboarding data
    const onboardingData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      completedAt: new Date().toISOString(),
    }
    localStorage.setItem('onboarding', JSON.stringify(onboardingData))
    localStorage.setItem('isAuthenticated', 'true')

    await new Promise(resolve => setTimeout(resolve, 1000))

    router.push('/dashboard')
  }

  const goalOptions = [
    'Increase productivity',
    'Improve collaboration',
    'Scale operations',
    'Enhance security',
    'Reduce costs',
    'Better analytics',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-balance">
            {step === 1 && 'Tell us about yourself'}
            {step === 2 && 'About your team'}
            {step === 3 && 'What are your goals?'}
          </h1>
          <p className="text-muted-foreground text-pretty">
            {step === 1 && 'Help us personalize your experience'}
            {step === 2 && 'Understanding your team helps us serve you better'}
            {step === 3 && 'Select all that apply to your needs'}
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Company name"
                value={step1Data.company}
                onChange={handleStep1Change}
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="Product Manager"
                value={step1Data.role}
                onChange={handleStep1Change}
                className={errors.role ? 'border-destructive' : ''}
              />
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <select
                id="teamSize"
                name="teamSize"
                value={step2Data.teamSize}
                onChange={handleStep2Change}
                className={`flex h-10 w-full rounded-md border ${
                  errors.teamSize ? 'border-destructive' : 'border-input'
                } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
              >
                <option value="">Select team size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.teamSize && (
                <p className="text-sm text-destructive">{errors.teamSize}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                type="text"
                placeholder="Technology, Healthcare, Finance..."
                value={step2Data.industry}
                onChange={handleStep2Change}
                className={errors.industry ? 'border-destructive' : ''}
              />
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    step3Data.goals.includes(goal)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        step3Data.goals.includes(goal)
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {step3Data.goals.includes(goal) && (
                        <svg
                          className="w-3 h-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{goal}</span>
                  </div>
                </button>
              ))}
            </div>
            {errors.goals && (
              <p className="text-sm text-destructive">{errors.goals}</p>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
              size="lg"
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1"
              size="lg"
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1"
              size="lg"
            >
              Complete Setup
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
