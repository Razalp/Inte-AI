import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Target, Award, Plus, Building2, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

type InterviewStatus = "applied" | "interviewing" | "rejected" | "offered";

type Interview = {
  id: string;
  company: string;
  position: string;
  location: string;
  appliedDate: string;
  status: InterviewStatus;
};

const statusConfig = {
  applied: { color: "bg-info text-info-foreground", label: "Applied" },
  interviewing: { color: "bg-warning text-warning-foreground", label: "Interviewing" },
  rejected: { color: "bg-destructive text-destructive-foreground", label: "Rejected" },
  offered: { color: "bg-success text-success-foreground", label: "Offered" },
};

export const InterviewStatus = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "1",
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Mountain View, CA",
      appliedDate: "2024-01-15",
      status: "interviewing",
    },
    {
      id: "2",
      company: "Meta",
      position: "Software Engineer",
      location: "Menlo Park, CA",
      appliedDate: "2024-01-10",
      status: "applied",
    },
    {
      id: "3",
      company: "Amazon",
      position: "Full Stack Developer",
      location: "Seattle, WA",
      appliedDate: "2024-01-05",
      status: "rejected",
    },
    {
      id: "4",
      company: "Microsoft",
      position: "Cloud Engineer",
      location: "Redmond, WA",
      appliedDate: "2023-12-20",
      status: "offered",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({
    company: "",
    position: "",
    location: "",
    appliedDate: new Date().toISOString().split('T')[0],
  });

  const stats = [
    { label: "Applications", value: interviews.length, icon: BarChart3, gradient: "bg-gradient-blue" },
    { label: "Interviews", value: interviews.filter(i => i.status === "interviewing").length, icon: Target, gradient: "bg-gradient-orange" },
    { label: "Rejections", value: interviews.filter(i => i.status === "rejected").length, icon: TrendingUp, gradient: "bg-gradient-purple" },
    { label: "Offers", value: interviews.filter(i => i.status === "offered").length, icon: Award, gradient: "bg-gradient-green" },
  ];

  const handleAddInterview = () => {
    if (newInterview.company && newInterview.position) {
      const interview: Interview = {
        id: Date.now().toString(),
        ...newInterview,
        status: "applied",
      };
      setInterviews([interview, ...interviews]);
      setNewInterview({
        company: "",
        position: "",
        location: "",
        appliedDate: new Date().toISOString().split('T')[0],
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleStatusChange = (id: string, newStatus: InterviewStatus) => {
    setInterviews(interviews.map(interview => 
      interview.id === id ? { ...interview, status: newStatus } : interview
    ));
  };

  const filterByStatus = (status?: InterviewStatus) => {
    return status ? interviews.filter(i => i.status === status) : interviews;
  };

  const renderInterviewList = (filteredInterviews: Interview[]) => (
    <div className="space-y-3">
      {filteredInterviews.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No interviews in this category</p>
        </div>
      ) : (
        filteredInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-medium transition-all duration-300 border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">{interview.company}</h4>
                    <Badge className={statusConfig[interview.status].color}>
                      {statusConfig[interview.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{interview.position}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {interview.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {interview.appliedDate}
                    </div>
                  </div>
                </div>
                <Select
                  value={interview.status}
                  onValueChange={(value) => handleStatusChange(interview.id, value as InterviewStatus)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.gradient} shadow-colored border-0 overflow-hidden relative group hover:scale-105 transition-transform duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-white">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-white/80 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </CardContent>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card shadow-medium border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track and manage your interview pipeline</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-purple shadow-colored hover:scale-105 transition-transform">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Interview
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Interview</DialogTitle>
                  <DialogDescription>
                    Track a new job application in your pipeline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      placeholder="e.g., Google"
                      value={newInterview.company}
                      onChange={(e) => setNewInterview({ ...newInterview, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      placeholder="e.g., Senior Developer"
                      value={newInterview.position}
                      onChange={(e) => setNewInterview({ ...newInterview, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., San Francisco, CA"
                      value={newInterview.location}
                      onChange={(e) => setNewInterview({ ...newInterview, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Application Date</Label>
                    <Input
                      type="date"
                      value={newInterview.appliedDate}
                      onChange={(e) => setNewInterview({ ...newInterview, appliedDate: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddInterview} className="bg-gradient-purple">
                    Add Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="offered">Offered</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {renderInterviewList(interviews)}
            </TabsContent>
            <TabsContent value="applied" className="space-y-4">
              {renderInterviewList(filterByStatus("applied"))}
            </TabsContent>
            <TabsContent value="interviewing" className="space-y-4">
              {renderInterviewList(filterByStatus("interviewing"))}
            </TabsContent>
            <TabsContent value="rejected" className="space-y-4">
              {renderInterviewList(filterByStatus("rejected"))}
            </TabsContent>
            <TabsContent value="offered" className="space-y-4">
              {renderInterviewList(filterByStatus("offered"))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
