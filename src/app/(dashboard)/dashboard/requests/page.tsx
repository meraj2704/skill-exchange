"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">(
    "incoming"
  );
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUser(user);
  }, []);

  const fetchRequests = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/requests?userId=${currentUser.id}&type=${activeTab}`
      );
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeTab, currentUser]);

  const handleUpdateStatus = async (requestId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/requests/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status: newStatus }),
      });
      if (res.ok) {
        // Refresh local state
        setRequests((prev) =>
          prev.map((r) =>
            r._id === requestId ? { ...r, status: newStatus } : r
          )
        );
      }
    } catch (err) {
      console.error("Update error", err);
    }
  };

  return (
    <div className=" mx-auto py-10 px-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Connections</h1>
          <p className="text-muted-foreground mt-1">
            Manage your learning and mentoring invitations.
          </p>
        </div>
      </div>

      <div className="flex p-1 bg-muted w-fit rounded-2xl border border-border">
        <TabButton
          active={activeTab === "incoming"}
          onClick={() => setActiveTab("incoming")}
          icon={<ArrowDownLeft size={18} />}
          label="Incoming"
        />
        <TabButton
          active={activeTab === "outgoing"}
          onClick={() => setActiveTab("outgoing")}
          icon={<ArrowUpRight size={18} />}
          label="Sent"
        />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <div key="loader" className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : requests.length > 0 ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4"
          >
            {requests.map((req) => (
              <RequestCard
                key={req._id}
                req={req}
                type={activeTab}
                onUpdate={handleUpdateStatus}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState key="empty" type={activeTab} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Inside RequestCard component in RequestsPage.tsx

function RequestCard({ req, type, onUpdate }: any) {
  const isIncoming = type === "incoming";
  const name = isIncoming ? req.learnerName : req.mentorName;
  const isAccepted = req.status === "accepted";

  return (
    <div className="p-6 bg-background border border-border rounded-[2rem] flex flex-col gap-4 hover:border-primary/40 transition-all shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary text-xl font-black">
            {name?.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-lg">{name}</h4>
            <p className="text-sm text-muted-foreground">
              {isIncoming ? "Requests to learn" : "You want to learn"}{" "}
              <span className="text-primary font-bold">{req.skillName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <StatusBadge status={req.status} />

          {isIncoming && req.status === "pending" && (
            <div className="flex gap-2 border-l pl-4 border-border">
              <button
                onClick={() => onUpdate(req._id, "rejected")}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <XCircle size={24} />
              </button>
              <button
                onClick={() => onUpdate(req._id, "accepted")}
                className="p-2.5 text-green-500 hover:bg-green-50 rounded-xl transition-colors"
              >
                <CheckCircle2 size={24} />
              </button>
            </div>
          )}

          {/* Unlocked Chat Button */}
          <button
            disabled={!isAccepted}
            className={`p-3 rounded-xl transition flex items-center gap-2 text-sm font-bold ${
              isAccepted
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <MessageSquare size={18} />{" "}
            {isAccepted ? "Start Chat" : "Chat Locked"}
          </button>
        </div>
      </div>

      {/* REVEALED CONTACT INFO SECTION */}
      {isAccepted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 pt-4 border-t border-dashed border-border flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl">
            <Globe size={14} /> Connection unlocked! You can now coordinate your
            session.
          </div>
          <Link
            href={`mailto:${isIncoming ? req.learnerEmail : req.mentorEmail}`}
            className="text-xs font-bold hover:underline flex items-center gap-1 text-primary"
          >
            Email {name}: {isIncoming ? req.learnerEmail : req.mentorEmail}
          </Link>
        </motion.div>
      )}
    </div>
  );
}

// UI HELPER COMPONENTS
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
        active
          ? "bg-background shadow-md text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    pending: "bg-orange-100 text-orange-700 border-orange-200",
    accepted: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-20 bg-muted/20 border-2 border-dashed rounded-[3rem] border-border">
      <Clock className="text-muted-foreground mx-auto mb-4" size={48} />
      <h3 className="text-xl font-bold">No {type} requests yet</h3>
      <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
        {type === "incoming"
          ? "When someone wants to learn from you, it will appear here."
          : "Go find some skills and start learning!"}
      </p>
    </div>
  );
}
