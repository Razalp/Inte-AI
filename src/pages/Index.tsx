import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeBuilder } from "@/components/dashboard/ResumeBuilder";
import { InterviewStatus } from "@/components/dashboard/InterviewStatus";
import { QASession } from "@/components/dashboard/QASession";
import { AIInterviewer } from "@/components/dashboard/AIInterviewer";
import { FileText, BarChart3, MessageSquare, Video, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center shadow-colored hover:scale-110 transition-transform">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-purple bg-clip-text text-transparent">
                YourInterviewr
              </h1>
              <p className="text-xs text-muted-foreground">AI Interview Prep</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-muted-foreground">
            Your AI-powered interview preparation platform
          </p>
        </div>

        <Tabs defaultValue="resume" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm shadow-soft border border-border p-1">
            <TabsTrigger 
              value="resume" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-purple data-[state=active]:text-white data-[state=active]:shadow-colored transition-all"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </TabsTrigger>
            <TabsTrigger 
              value="status" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-blue data-[state=active]:text-white data-[state=active]:shadow-colored transition-all"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Status</span>
            </TabsTrigger>
            <TabsTrigger 
              value="qa" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-green data-[state=active]:text-white data-[state=active]:shadow-colored transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Q&A</span>
            </TabsTrigger>
            <TabsTrigger 
              value="interview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-orange data-[state=active]:text-white data-[state=active]:shadow-colored transition-all"
            >
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Interview</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume" className="space-y-4 animate-fade-in">
            <ResumeBuilder />
          </TabsContent>

          <TabsContent value="status" className="space-y-4 animate-fade-in">
            <InterviewStatus />
          </TabsContent>

          <TabsContent value="qa" className="space-y-4 animate-fade-in">
            <QASession />
          </TabsContent>

          <TabsContent value="interview" className="space-y-4 animate-fade-in">
            <AIInterviewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
