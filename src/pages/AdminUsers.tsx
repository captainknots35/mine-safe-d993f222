import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isTestAccount } from "@/utils/testAccountFilter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ChevronLeft, 
  Users, 
  Search, 
  GraduationCap, 
  CreditCard, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";

interface UserDetails {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  job_title: string | null;
  phone: string | null;
  created_at: string;
  role: string;
  enrollments: {
    id: string;
    course_id: string;
    course_title: string;
    status: string;
    enrolled_at: string;
    started_at: string | null;
    completed_at: string | null;
  }[];
  purchases: {
    id: string;
    course_id: string;
    course_title: string;
    amount_cents: number;
    currency: string;
    status: string;
    purchased_at: string | null;
    created_at: string;
  }[];
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users-repository"],
    queryFn: async () => {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Filter out test accounts
      const realProfiles = (profiles || []).filter(p => !isTestAccount(p.email));

      // Fetch user roles
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // Fetch enrollments with course info
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select(`
          id,
          user_id,
          course_id,
          status,
          enrolled_at,
          started_at,
          completed_at,
          courses (title)
        `);

      // Fetch purchases with course info
      const { data: purchases } = await supabase
        .from("course_purchases")
        .select(`
          id,
          user_id,
          course_id,
          amount_cents,
          currency,
          status,
          purchased_at,
          created_at,
          courses (title)
        `);

      // Build user details
      const userDetails: UserDetails[] = realProfiles.map(profile => {
        const userRole = roles?.find(r => r.user_id === profile.id);
        const userEnrollments = (enrollments || [])
          .filter(e => e.user_id === profile.id)
          .map(e => ({
            id: e.id,
            course_id: e.course_id,
            course_title: (e.courses as any)?.title || "Unknown Course",
            status: e.status || "not_started",
            enrolled_at: e.enrolled_at || "",
            started_at: e.started_at,
            completed_at: e.completed_at,
          }));

        const userPurchases = (purchases || [])
          .filter(p => p.user_id === profile.id)
          .map(p => ({
            id: p.id,
            course_id: p.course_id,
            course_title: (p.courses as any)?.title || "Unknown Course",
            amount_cents: p.amount_cents,
            currency: p.currency || "usd",
            status: p.status,
            purchased_at: p.purchased_at,
            created_at: p.created_at || "",
          }));

        return {
          id: profile.id,
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
          company_name: profile.company_name,
          job_title: profile.job_title,
          phone: profile.phone,
          created_at: profile.created_at || "",
          role: userRole?.role || "miner",
          enrollments: userEnrollments,
          purchases: userPurchases,
        };
      });

      return userDetails;
    },
  });

  const filteredUsers = users?.filter(user => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.company_name?.toLowerCase().includes(query)
    );
  });

  const toggleUserExpansion = (userId: string) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-700">Not Started</Badge>;
      case "succeeded":
        return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-700">Admin</Badge>;
      case "instructor":
        return <Badge className="bg-blue-100 text-blue-700">Instructor</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Miner</Badge>;
    }
  };

  const totalRevenue = users?.reduce((sum, user) => {
    return sum + user.purchases
      .filter(p => p.status === "succeeded")
      .reduce((pSum, p) => pSum + p.amount_cents, 0);
  }, 0) || 0;

  const totalEnrollments = users?.reduce((sum, user) => sum + user.enrollments.length, 0) || 0;
  const completedEnrollments = users?.reduce((sum, user) => 
    sum + user.enrollments.filter(e => e.status === "completed").length, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/admin")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Repository
            </h1>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{users?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold">{totalEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completions</p>
                  <p className="text-2xl font-bold">{completedEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${(totalRevenue / 100).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Complete breakdown of user signups, enrollments, and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Signed Up</TableHead>
                      <TableHead className="text-center">Enrollments</TableHead>
                      <TableHead className="text-center">Payments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers?.map((user) => (
                      <>
                        <TableRow 
                          key={user.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleUserExpansion(user.id)}
                        >
                          <TableCell>
                            {expandedUsers.has(user.id) ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.first_name} {user.last_name}</p>
                              {user.company_name && (
                                <p className="text-sm text-muted-foreground">{user.company_name}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{user.email}</p>
                              {user.phone && (
                                <p className="text-sm text-muted-foreground">{user.phone}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>
                            {user.created_at ? format(new Date(user.created_at), "MMM d, yyyy") : "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{user.enrollments.length}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{user.purchases.length}</Badge>
                          </TableCell>
                        </TableRow>

                        {/* Expanded Details */}
                        {expandedUsers.has(user.id) && (
                          <TableRow>
                            <TableCell colSpan={7} className="bg-muted/30 p-0">
                              <div className="p-4 space-y-4">
                                {/* User Details */}
                                <div className="grid gap-4 md:grid-cols-2">
                                  {/* Enrollments */}
                                  <Card>
                                    <CardHeader className="py-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Course Enrollments
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-2">
                                      {user.enrollments.length === 0 ? (
                                        <p className="text-sm text-muted-foreground py-2">No enrollments yet</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {user.enrollments.map((enrollment) => (
                                            <div 
                                              key={enrollment.id}
                                              className="flex items-center justify-between p-2 rounded-lg bg-background"
                                            >
                                              <div className="flex-1">
                                                <p className="text-sm font-medium">{enrollment.course_title}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                  <Clock className="h-3 w-3" />
                                                  Enrolled: {format(new Date(enrollment.enrolled_at), "MMM d, yyyy")}
                                                  {enrollment.completed_at && (
                                                    <>
                                                      <span>•</span>
                                                      <CheckCircle className="h-3 w-3 text-green-500" />
                                                      Completed: {format(new Date(enrollment.completed_at), "MMM d, yyyy")}
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                              {getStatusBadge(enrollment.status)}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Payments */}
                                  <Card>
                                    <CardHeader className="py-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Payment History
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-2">
                                      {user.purchases.length === 0 ? (
                                        <p className="text-sm text-muted-foreground py-2">No payments yet</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {user.purchases.map((purchase) => (
                                            <div 
                                              key={purchase.id}
                                              className="flex items-center justify-between p-2 rounded-lg bg-background"
                                            >
                                              <div className="flex-1">
                                                <p className="text-sm font-medium">{purchase.course_title}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                  <DollarSign className="h-3 w-3" />
                                                  ${(purchase.amount_cents / 100).toFixed(2)} {purchase.currency.toUpperCase()}
                                                  <span>•</span>
                                                  {purchase.purchased_at 
                                                    ? format(new Date(purchase.purchased_at), "MMM d, yyyy")
                                                    : format(new Date(purchase.created_at), "MMM d, yyyy")
                                                  }
                                                </div>
                                              </div>
                                              {getStatusBadge(purchase.status)}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Additional Info */}
                                {(user.job_title || user.phone) && (
                                  <div className="flex gap-4 text-sm text-muted-foreground">
                                    {user.job_title && <span>Job Title: {user.job_title}</span>}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsers;
