"use client";

import { InformationSection } from "@/components/information-section";
import { PreviewResume } from "@/components/preview-resume";
import { ResumeUploaderComponent } from "@/components/resume-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
 
type JSONData = Record<string, any>;

export default function Home() {
  const [jsonData, setJsonData] = useState<JSONData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "resume-" + getName(),
  });

  function getName() {
    try {
      return jsonData?.basics.name.toLowerCase().replace(" ", "-");
    } catch (e) {
      return "";
    }
  }

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
        <div className="flex justify-end fixed right-0 m-5 flex-col z-50">
          <div className="flex space-x-2 w-full">
            <Button onClick={() => setJsonData(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button onClick={() => handlePrint()} className="w-full">
              <Download className="w-4 h-4 mr-1" />
              Download PDF
            </Button>
          </div>
          <Card className="w-full mt-5 flex justify-end container">
            <CardContent className="p-4">
              <p className="w-72 rounded-sm">
                When printing disable the option{" "}
                <b>"Print headers and footers"</b> and <b>"Print background"</b>{" "}
                for a clean pdf.
              </p>
            </CardContent>
          </Card>
        </div>
        <PreviewResume ref={componentRef} json={jsonData} />
      </div>
    );
  }
}
