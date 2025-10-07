import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Sparkles } from "lucide-react";

export const ResumeBuilder = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-medium border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Resume Builder
              </CardTitle>
              <CardDescription>
                Create your professional resume and check ATS compatibility
              </CardDescription>
            </div>
            <div className="text-center bg-gradient-purple text-white px-6 py-3 rounded-lg shadow-colored">
              <p className="text-xs font-medium mb-1">ATS Score</p>
              <p className="text-3xl font-bold">--/100</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" className="transition-all focus:shadow-soft" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com" className="transition-all focus:shadow-soft" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Professional Summary</Label>
            <Textarea 
              placeholder="Experienced software engineer with 5+ years..."
              className="min-h-[100px] transition-all focus:shadow-soft"
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <Input placeholder="React, TypeScript, Node.js..." className="transition-all focus:shadow-soft" />
          </div>

          <div className="space-y-2">
            <Label>Experience</Label>
            <Textarea 
              placeholder="Senior Developer at Company X (2020-2024)..."
              className="min-h-[120px] transition-all focus:shadow-soft"
            />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-purple shadow-colored hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 mr-2" />
              Analyze ATS Score
            </Button>
            <Button variant="outline" className="hover:shadow-medium transition-all">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
