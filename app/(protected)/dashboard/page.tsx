"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { User, OnboardingData } from "@/types";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  BriefcaseIcon,
  TargetIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
  UserPlusIcon,
  SettingsIcon,
  BellIcon,
} from "lucide-react";
import { activities, stats } from "@/constant";
import Navbar from "@/components/nav";

const getFromStorage = <T,>(key: string): T | null => {
  try {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "users":
      return <UsersIcon className="w-5 h-5" />;
    case "briefcase":
      return <BriefcaseIcon className="w-5 h-5" />;
    case "target":
      return <TargetIcon className="w-5 h-5" />;
    case "trending":
      return <TrendingUpIcon className="w-5 h-5" />;
    case "check":
      return <CheckCircle2Icon className="w-5 h-5" />;
    case "user":
      return <UserPlusIcon className="w-5 h-5" />;
    case "settings":
      return <SettingsIcon className="w-5 h-5" />;
    default:
      return <BellIcon className="w-5 h-5" />;
  }
};

const getStatIconStyle = (icon: string) => {
  const styles: Record<string, string> = {
    users: "bg-primary/10 text-primary",
    briefcase: "bg-secondary/10 text-secondary",
    target: "bg-accent/10 text-accent",
  };
  return styles[icon] || "bg-chart-4/10 text-chart-4";
};

const getActivityIconStyle = (type: string) => {
  const styles: Record<string, string> = {
    success: "bg-chart-4/10 text-chart-4",
    user: "bg-primary/10 text-primary",
  };
  return styles[type] || "bg-secondary/10 text-secondary";
};

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState<User | null>(() => getFromStorage<User>("user"));
  const [onboarding] = useState<OnboardingData | null>(() =>
    getFromStorage<OnboardingData>("onboarding")
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="size-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="size-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl mt-5 font-bold text-foreground">
                Welcome back, {user.name}
              </h2>
              <p className="text-muted-foreground text-lg mt-2">
                Here&#39;s what&#39;s happening with your account today
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="p-6 hover:shadow-lg transition-shadow shadow-none hover:border-primary/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${getStatIconStyle(stat.icon)}`}
                  >
                    {getIcon(stat.icon)}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trend === "up" ? "text-chart-4" : "text-destructive"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Your Profile</h3>
                <Button variant="outline" size="sm" className="rounded-full">
                  Edit Profile
                </Button>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-primary capitalize flex items-center justify-center text-4xl font-bold text-primary-foreground">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-semibold text-lg">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Email Address
                    </p>
                    <p className="font-semibold text-lg">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-semibold text-lg">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Account Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-chart-4 animate-pulse" />
                      <p className="font-semibold text-lg text-chart-4">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {onboarding && (
                <div className="pt-6 border-t space-y-4">
                  <h4 className="font-semibold text-lg">
                    Organization Details
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-semibold">{onboarding.company}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-semibold">{onboarding.role}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-semibold">{onboarding.teamSize}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-semibold">{onboarding.industry}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                    <p className="text-sm text-muted-foreground">Your Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {onboarding.goals.map((goal) => (
                        <span
                          key={goal}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 space-y-6">
              <h3 className="text-2xl font-bold">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg ${getActivityIconStyle(
                        activity.type
                      )}`}
                    >
                      {getIcon(activity.icon)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-snug">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full rounded-full" variant="outline">
                View All Activity
              </Button>
            </Card>
          </div>

          <div className="flex  items-start justify-center gap-4">
            <p className="text-muted-foreground max-w-2xl">
              This was created by Agunbiade Aishat - 18/11/2024
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
