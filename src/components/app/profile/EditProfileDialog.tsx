"use client";

import { useState } from "react";
import { User, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/shared/UserAvatar";
import type { User as UserType } from "@/types/user";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
  onSave: (updates: { name: string; bio: string }) => void;
}

export function EditProfileDialog({
  open,
  onClose,
  user,
  onSave,
}: EditProfileDialogProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(
    "Aktif melaporkan masalah dan berkontribusi untuk perbaikan lingkungan sekitar."
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSave({ name, bio });
    setIsSaving(false);
    onClose();
  };

  const handleClose = () => {
    // Reset to original values
    setName(user.name);
    setBio(
      "Aktif melaporkan masalah dan berkontribusi untuk perbaikan lingkungan sekitar."
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-[#2c2c21]">
            Edit Profil
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="relative">
              <UserAvatar name={name} size="lg" />
              <div className="absolute -bottom-1 -right-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#FACC15] border-2 border-white flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-[#2c2c21]" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-xs sm:text-sm text-gray-500"
            >
              Ubah Foto
            </Button>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="pl-10 bg-gray-50 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Email Field (Read-only) */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                value={user.email}
                disabled
                className="pl-10 bg-gray-100 text-gray-500 cursor-not-allowed text-sm sm:text-base"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Email tidak dapat diubah
            </p>
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <Label
              htmlFor="bio"
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan tentang diri Anda..."
              rows={4}
              maxLength={200}
              className="resize-none bg-gray-50 text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-gray-500 text-right">
              {bio.length}/200 karakter
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-3 sm:pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSaving}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21] font-semibold w-full sm:w-auto order-1 sm:order-2"
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
