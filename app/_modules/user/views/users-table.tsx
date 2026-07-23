"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useGetUsers } from "../hooks/useGetAllUsers";
import defaultUserImage from "@/public/assets/default-user1.png";
import transformingTheDateToATextString from "@/utils/from-date-to-string";
import { UserRole } from "../entity/user";


const ROLE_OPTIONS: { label: string; value: UserRole | undefined }[] = [
  { label: "All Roles", value: undefined },
  { label: "Admin", value: "admin" },
  { label: "Instructor", value: "instructor" },
  { label: "Student", value: "student" },
];

export default function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const [appliedRole, setAppliedRole] = useState<UserRole | undefined>();

  const { data, isLoading } = useGetUsers({
    page,
    limit: 10,
    userRole: appliedRole,
  });

  const users = data?.users ?? [];
  const meta = data?.meta;

  const activeRoleLabel =
    ROLE_OPTIONS.find((option) => option.value === selectedRole)?.label ??
    "All Roles";

  const handleRoleChange = (role: UserRole | undefined) => {
    setSelectedRole(role);
  };

  if (isLoading) {
    //todo create skeleton component
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No users found</div>;
  }

  const goToPreviousPage = () => {
    if (meta?.hasPreviousPage) setPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (meta?.hasNextPage) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage all platform users.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              setAppliedRole(selectedRole);
              setPage(1);
            }}
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" className="gap-2" />}
            >
              {activeRoleLabel}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ROLE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => handleRoleChange(option.value)}
                  className={
                    option.value === selectedRole
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : ""
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Joined</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium flex items-center gap-3 py-3">
                    <Image
                      src={user.avatar || defaultUserImage}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border"
                      width={40}
                      height={40}
                    />
                    <span>{user.name}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isVerified
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}
                    >
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {transformingTheDateToATextString(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          />
                        }
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {meta && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={!meta.hasPreviousPage}
                onClick={goToPreviousPage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <span className="px-3 text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={!meta.hasNextPage}
                onClick={goToNextPage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
