import Logo from './Logo';
import LoginButton from './LoginButton';
import { Sparkles, TrendingUp, Target, Lightbulb } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-xl font-bold text-foreground">CareerVision AI</span>
        </div>
        <LoginButton />
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">Career Path</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered career guidance that helps you understand your strengths, explore opportunities, and plan your future with confidence.
          </p>

          <div className="pt-8">
            <LoginButton />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="AI-Powered Insights"
              description="Get personalized career predictions based on your unique profile"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Growth Analysis"
              description="Understand your strengths and areas for development"
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8" />}
              title="Career Paths"
              description="Explore tailored career options that match your goals"
            />
            <FeatureCard 
              icon={<Lightbulb className="w-8 h-8" />}
              title="Expert Advice"
              description="Receive actionable guidance to advance your career"
            />
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CareerVision AI. Built with ❤️ using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow">
      <div className="text-amber-600 dark:text-amber-400">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
