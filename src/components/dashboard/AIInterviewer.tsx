import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, Play, Circle } from "lucide-react";
import { useState } from "react";

export const AIInterviewer = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-medium border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            AI Video Interview
          </CardTitle>
          <CardDescription>
            Experience a real interview with AI face tracking and feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-gradient-subtle rounded-lg border-2 border-border flex items-center justify-center overflow-hidden relative group">
            {!isSessionActive ? (
              <div className="text-center space-y-4 relative z-10">
                <div className="bg-gradient-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-colored">
                  <Video className="h-10 w-10 text-white" />
                </div>
                <div>
                  <p className="font-medium mb-1">Ready to start your interview?</p>
                  <p className="text-sm text-muted-foreground">
                    We'll analyze your responses, eye contact, and body language
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 relative z-10">
                <div className="relative">
                  <div className="bg-gradient-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-colored animate-pulse">
                    <Video className="h-10 w-10 text-white" />
                  </div>
                  <Circle className="absolute top-0 right-0 h-4 w-4 text-destructive fill-destructive animate-pulse" />
                </div>
                <div>
                  <p className="font-medium mb-1">Interview in Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Camera and microphone active
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-blue border-0 shadow-colored hover:scale-105 transition-transform">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="font-medium">Eye Contact</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {isSessionActive ? "82%" : "--"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-green border-0 shadow-colored hover:scale-105 transition-transform">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="font-medium">Confidence</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {isSessionActive ? "Good" : "--"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            {!isSessionActive ? (
              <Button
                className="flex-1 bg-gradient-purple shadow-colored hover:scale-105 transition-transform"
                onClick={() => setIsSessionActive(true)}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1 hover:shadow-medium transition-all">
                  <Mic className="h-4 w-4 mr-2" />
                  Mute
                </Button>
                <Button variant="outline" className="flex-1 hover:shadow-medium transition-all">
                  <VideoOff className="h-4 w-4 mr-2" />
                  Stop Video
                </Button>
                <Button
                  variant="destructive"
                  className="hover:scale-105 transition-transform"
                  onClick={() => setIsSessionActive(false)}
                >
                  End
                </Button>
              </>
            )}
          </div>

          <Card className="border-2 border-info/20 bg-info/5">
            <CardContent className="pt-4">
              <div className="text-sm space-y-2">
                <p className="font-medium flex items-center gap-2">
                  <span className="text-info">🎯</span>
                  <span>What we track:</span>
                </p>
                <ul className="space-y-1.5 ml-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Eye contact and engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    Speaking pace and clarity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    Body language and posture
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                    Answer quality and structure
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
