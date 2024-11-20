"use client";

import { PreviewResume } from "@/components/preview-resume";
import { ResumeUploaderComponent } from "@/components/resume-uploader";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type JSONData = Record<string, any>;

export default function Home() {
  const [jsonData, setJsonData] = useState<JSONData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({ contentRef: componentRef });

  if (!jsonData) {
    return (
      <ResumeUploaderComponent setJsonData={setJsonData} ref={componentRef} />
    );
  }

  if (jsonData) {
    return (
      <div>
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setJsonData(null)}
            className="m-5"
            variant="outline"
          >
            <Trash className="w-4 h-4 mr-2" />
            Clear Resume
          </Button>
          <Button onClick={() => handlePrint()} className="m-5">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <PreviewResume ref={componentRef} json={jsonData} />
      </div>
    );
  }
}
