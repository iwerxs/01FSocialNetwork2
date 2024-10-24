//src/components/CropImageDialog.tsx
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob) => void;
  onClose: () => void;
}

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCropped,
  onClose,
}: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  }
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Crop Image</DialogHeader>
        <Cropper
          src={src}
          ref={cropperRef}
          aspectRatio={cropAspectRatio}
          guides={false}
          zoomable={false}
          className="mx-auto size-fit"
        />
      </DialogContent>
    </Dialog>
  );
}
