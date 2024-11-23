"use client";

import { InformationSection } from "@/components/information-section";
import { PreviewResume } from "@/components/preview-resume";
import { ResumeUploaderComponent } from "@/components/resume-uploader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type JSONData = Record<string, any>;

export default function Home() {
  const [jsonData, setJsonData] = useState<JSONData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (!jsonData) {
    return (
      <div>
        <ResumeUploaderComponent setJsonData={setJsonData} ref={componentRef} />
        <InformationSection />
      </div>
    );
  }

  if (jsonData) {
    return (
      <div>
        <div className="flex justify-end mb-4 fixed right-0 gap-2 m-5">
          <Button
            onClick={() => setJsonData(null)}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button onClick={() => handlePrint()}>
            <Download className="w-4 h-4 mr-1" />
            Download PDF
          </Button>
        </div>
        <PreviewResume ref={componentRef} json={jsonData} />
      </div>
    );
  }
}
