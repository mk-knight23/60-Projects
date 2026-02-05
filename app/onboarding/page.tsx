"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

/**
 * 4-Step Onboarding Flow
 * Step 1: Welcome
 * Step 2: Profile (name + interests)
 * Step 3: Preferences (project types + email prefs)
 * Step 4: Done (success + summary)
 */

interface OnboardingFormData {
  name: string
  interests: string[]
  projectLevel: string
  emailPrefs: string[]
}

const INTERESTS = [
  { id: "web", label: "Web Development", icon: "💻" },
  { id: "mobile", label: "Mobile Apps", icon: "📱" },
  { id: "ai", label: "AI & ML", icon: "🤖" },
  { id: "devops", label: "DevOps", icon: "⚙️" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "data", label: "Data Science", icon: "📊" },
]

const PROJECT_LEVELS = [
  { id: "beginner", label: "Beginner", description: "New to coding" },
  { id: "intermediate", label: "Intermediate", description: "Some experience" },
  { id: "advanced", label: "Advanced", description: "Experienced developer" },
]

const EMAIL_PREFS = [
  { id: "updates", label: "Product updates" },
  { id: "tips", label: "Weekly tips & tutorials" },
  { id: "projects", label: "New project announcements" },
]

type Step = 1 | 2 | 3 | 4

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [formData, setFormData] = useState<OnboardingFormData>({
    name: "",
    interests: [],
    projectLevel: "",
    emailPrefs: [],
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser({ id: user.id, email: user.email || "" })

      // Check if already completed
      const { data: userData } = await supabase
        .from("users")
        .select("onboarding_completed, name")
        .eq("id", user.id)
        .single()

      if (userData?.onboarding_completed) {
        router.push("/dashboard")
        return
      }

      // Pre-fill name if exists
      if (userData?.name) {
        setFormData((prev) => ({ ...prev, name: userData.name }))
      }
    }

    checkAuth()
  }, [router])

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const toggleEmailPref = (prefId: string) => {
    setFormData((prev) => ({
      ...prev,
      emailPrefs: prev.emailPrefs.includes(prefId)
        ? prev.emailPrefs.filter((p) => p !== prefId)
        : [...prev.emailPrefs, prefId],
    }))
  }

  const handleContinue = async () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step)
    } else {
      await completeOnboarding()
    }
  }

  const handleSkip = async () => {
    if (!user) return
    setLoading(true)

    try {
      const supabase = createClient()
      await supabase.from("users").update({ onboarding_completed: true }).eq("id", user.id)

      router.push("/dashboard")
    } catch (error) {
      console.error("Error skipping onboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  const completeOnboarding = async () => {
    if (!user) return
    setLoading(true)

    try {
      const supabase = createClient()

      // Save user data
      await supabase
        .from("users")
        .update({
          name: formData.name || null,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      // Send onboarding complete email
      await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          subject: "You're all set up! 🎉",
          template: "onboardingComplete",
        }),
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProgress = () => {
    return (currentStep / 4) * 100
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur border-b border-base-content/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Step Indicators */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col items-center ${
                    currentStep >= step ? "text-primary" : "text-base-content/40"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep >= step ? "bg-primary text-primary-content" : "bg-base-300"
                    }`}
                  >
                    {currentStep > step ? "✓" : step}
                  </div>
                </div>
              ))}
            </div>

            {/* Skip Button */}
            {currentStep < 4 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleSkip}
                disabled={loading}
              >
                Skip for now
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-base-300 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && <WelcomeStep onContinue={handleContinue} loading={loading} />}

          {currentStep === 2 && (
            <ProfileStep
              formData={formData}
              updateFormData={updateFormData}
              toggleInterest={toggleInterest}
              onContinue={handleContinue}
              onBack={() => setCurrentStep(1)}
              loading={loading}
            />
          )}

          {currentStep === 3 && (
            <PreferencesStep
              formData={formData}
              updateFormData={updateFormData}
              toggleEmailPref={toggleEmailPref}
              onContinue={handleContinue}
              onBack={() => setCurrentStep(2)}
              loading={loading}
            />
          )}

          {currentStep === 4 && (
            <DoneStep
              formData={formData}
              onContinue={handleContinue}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Step Components
// ============================================

function WelcomeStep({
  onContinue,
  loading,
}: {
  onContinue: () => void
  loading: boolean
}) {
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">👋</div>
      <h1 className="text-4xl font-bold">Welcome to 60 Projects Ecosystem</h1>
      <p className="text-lg text-base-content/70">
        Let&apos;s get you set up with a personalized experience in just a few steps
      </p>

      <div className="card bg-base-200 bordered">
        <div className="card-body text-left">
          <h3 className="font-semibold mb-3">What to expect:</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Set up your profile</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Choose your interests</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Personalize project recommendations</span>
            </li>
          </ul>
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={onContinue} disabled={loading}>
        {loading && <span className="loading loading-spinner" />}
        Get Started
      </button>
    </div>
  )
}

function ProfileStep({
  formData,
  updateFormData,
  toggleInterest,
  onContinue,
  onBack,
  loading,
}: {
  formData: OnboardingFormData
  updateFormData: (field: string, value: string | string[]) => void
  toggleInterest: (id: string) => void
  onContinue: () => void
  onBack: () => void
  loading: boolean
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Tell us about yourself</h2>
        <p className="text-base-content/70 mt-2">
          Help us personalize your experience
        </p>
      </div>

      {/* Name Input */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Display Name (Optional)</span>
        </label>
        <input
          type="text"
          placeholder="How should we call you?"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
        />
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            You can always change this later in settings
          </span>
        </label>
      </div>

      {/* Interests */}
      <div>
        <h3 className="font-semibold mb-4">What are you interested in? (Select all that apply)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTERESTS.map((interest) => (
            <button
              key={interest.id}
              className={`card card-bordered cursor-pointer transition-all ${
                formData.interests.includes(interest.id)
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="card-body p-4 items-center text-center">
                <div className="text-3xl mb-2">{interest.icon}</div>
                <div className="text-sm font-medium">{interest.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button className="btn btn-ghost" onClick={onBack} disabled={loading}>
          Back
        </button>
        <button className="btn btn-primary" onClick={onContinue} disabled={loading}>
          {loading && <span className="loading loading-spinner" />}
          Continue
        </button>
      </div>
    </div>
  )
}

function PreferencesStep({
  formData,
  updateFormData,
  toggleEmailPref,
  onContinue,
  onBack,
  loading,
}: {
  formData: OnboardingFormData
  updateFormData: (field: string, value: string | string[]) => void
  toggleEmailPref: (id: string) => void
  onContinue: () => void
  onBack: () => void
  loading: boolean
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Your preferences</h2>
        <p className="text-base-content/70 mt-2">
          Customize your project recommendations
        </p>
      </div>

      {/* Project Level */}
      <div>
        <h3 className="font-semibold mb-4">What&apos;s your experience level?</h3>
        <div className="space-y-3">
          {PROJECT_LEVELS.map((level) => (
            <label
              key={level.id}
              className={`card card-bordered cursor-pointer transition-all ${
                formData.projectLevel === level.id
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary/50"
              }`}
            >
              <div className="card-body p-4 flex-row items-center gap-4">
                <input
                  type="radio"
                  name="projectLevel"
                  className="radio radio-primary"
                  checked={formData.projectLevel === level.id}
                  onChange={() => updateFormData("projectLevel", level.id)}
                />
                <div className="flex-1">
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-base-content/60">{level.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Email Preferences */}
      <div>
        <h3 className="font-semibold mb-4">Email preferences (Optional)</h3>
        <div className="space-y-2">
          {EMAIL_PREFS.map((pref) => (
            <label key={pref.id} className="cursor-pointer flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.emailPrefs.includes(pref.id)}
                onChange={() => toggleEmailPref(pref.id)}
              />
              <span>{pref.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button className="btn btn-ghost" onClick={onBack} disabled={loading}>
          Back
        </button>
        <button className="btn btn-primary" onClick={onContinue} disabled={loading}>
          {loading && <span className="loading loading-spinner" />}
          Continue
        </button>
      </div>
    </div>
  )
}

function DoneStep({
  formData,
  onContinue,
  loading,
}: {
  formData: OnboardingFormData
  onContinue: () => void
  loading: boolean
}) {
  const getSelectedInterests = () => {
    return formData.interests
      .map((id) => INTERESTS.find((i) => i.id === id)?.label)
      .filter(Boolean)
      .join(", ")
  }

  const getSelectedLevel = () => {
    return PROJECT_LEVELS.find((l) => l.id === formData.projectLevel)?.label || "Not specified"
  }

  return (
    <div className="text-center space-y-6">
      {/* Celebration */}
      <div className="text-6xl">🎉</div>
      <h1 className="text-4xl font-bold">You&apos;re all set!</h1>
      <p className="text-lg text-base-content/70">
        Welcome to the 60 Projects Ecosystem
      </p>

      {/* Summary Card */}
      <div className="card bg-base-200">
        <div className="card-body text-left">
          <h3 className="font-semibold mb-4">Here&apos;s what you told us:</h3>

          <div className="space-y-3">
            {formData.name && (
              <div>
                <div className="text-sm text-base-content/60">Name</div>
                <div className="font-medium">{formData.name}</div>
              </div>
            )}

            {formData.interests.length > 0 && (
              <div>
                <div className="text-sm text-base-content/60">Interests</div>
                <div className="font-medium">{getSelectedInterests()}</div>
              </div>
            )}

            {formData.projectLevel && (
              <div>
                <div className="text-sm text-base-content/60">Experience Level</div>
                <div className="font-medium">{getSelectedLevel()}</div>
              </div>
            )}

            {formData.emailPrefs.length > 0 && (
              <div>
                <div className="text-sm text-base-content/60">Email Preferences</div>
                <div className="font-medium">
                  {formData.emailPrefs
                    .map((id) => EMAIL_PREFS.find((p) => p.id === id)?.label)
                    .join(", ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-base-content/60">
          You can always change these preferences later in settings
        </p>
      </div>

      <button className="btn btn-primary btn-lg" onClick={onContinue} disabled={loading}>
        {loading && <span className="loading loading-spinner" />}
        Go to Dashboard
      </button>
    </div>
  )
}
