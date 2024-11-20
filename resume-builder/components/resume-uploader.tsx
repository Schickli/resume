"use client";

import { useState, useCallback, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";

type JSONData = Record<string, any>;

interface ResumeUploaderComponentProps {
  setJsonData: (data: JSONData | null) => void;
}

export const ResumeUploaderComponent = forwardRef<
  HTMLDivElement,
  ResumeUploaderComponentProps
>(({ setJsonData }, ref) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setJsonData(json);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing JSON file. Please make sure it's a valid JSON.");

        setJsonData(null);
      }
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
  });

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the JSON file here...</p>
            ) : (
              <p>Upload a https://jsonresume.org/ JSON File here...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
