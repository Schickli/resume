import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

export function InformationSection() {
  return (
    <div className="container mx-auto p-4">
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          <li>Please ensure that the profile image in your JSON resume data is square for optimal display.</li>
          <li>The resume layout is optimized for A4 paper size and PDF download.</li>
          <li>Printing might not work in Safari and Firefox Android.</li>
          <li>For the best experience, use a modern web browser on the desktop.</li>
          <li>This resume builder was created using Next.js, shadcn/ui and Tailwind CSS.</li>
          <li>Created by <a href="http://schickli.com" target="_blank" className="text-blue-500">Maurin Schickli</a> - {new Date().getFullYear()}</li>
        </ul>
      </CardContent>
    </Card>
    </div>
  );
}
