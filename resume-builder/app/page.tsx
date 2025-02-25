"use client";

import { InformationSection } from "@/components/information-section";
import { PreviewResume } from "@/components/preview-resume";
import { ResumeUploaderComponent } from "@/components/resume-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type JSONData = Record<string, any>;

export default function Home() {
  const [jsonData, setJsonData] = useState<JSONData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<"en" | "de">("en");

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
        <div className="fixed left-0 p-5 z-50 w-full">
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setJsonData(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              className="mb-4 px-4 py-2 rounded"
              onClick={() => setLanguage(language === "en" ? "de" : "en")}
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "en" ? "Deutsch" : "English"}
            </Button>
            <Button onClick={() => handlePrint()}>
              <Download className="w-4 h-4 mr-1" />
              Download PDF
            </Button>
          </div>
          <div className="flex justify-end w-full">
            <Card className="flex justify-end w-72">
              <CardContent className="p-4">
                <p className="w-full rounded-sm">
                  When printing disable the option{" "}
                  <b>"Print headers and footers"</b> and{" "}
                  <b>"Print background"</b> for a clean pdf.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <PreviewResume ref={componentRef} json={jsonData} language={language} />
      </div>
    );
  }
}
