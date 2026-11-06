"use client";

import { useRef, useState, type ReactNode } from "react";
import ResumeCard from "@/components/resume-card";
import { Button } from "@/components/ui/button";
import { EMAIL_URL } from "@/consts";
import styles from "./maintenance-resume.module.css";

type MaintenanceResumeProps = {
  children: ReactNode;
};

export default function MaintenanceResume({ children }: MaintenanceResumeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function closeResume() {
    setIsOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <main
      className={styles.layout}
      data-resume-open={isOpen}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) closeResume();
      }}
    >
      <div className={styles.profile}>
        {children}
        <div className={styles.actions}>
          <Button
            ref={toggleRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="maintenance-resume"
            onClick={() => setIsOpen((open) => !open)}
            variant="outline"
            className="min-h-11 rounded-md px-5 text-sm"
          >
            {isOpen ? "Hide resume" : "View resume"}
          </Button>
          <Button asChild variant="outline" className="min-h-11 rounded-md px-5 text-sm">
            <a href={EMAIL_URL}>Email me</a>
          </Button>
        </div>
      </div>

      <div className={styles.resumeSlot} inert={!isOpen} aria-hidden={!isOpen}>
        <section
          id="maintenance-resume"
          aria-labelledby="maintenance-resume-title"
        >
          <ResumeCard onClose={closeResume} className={styles.resumePanel} />
        </section>
      </div>
    </main>
  );
}
