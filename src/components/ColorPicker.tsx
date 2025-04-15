
import React from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={cn(
            "w-6 h-6 rounded-full transition-all border border-gray-200",
            selectedColor === color && "ring-2 ring-offset-2 ring-primary scale-110"
          )}
          style={{ backgroundColor: color }}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
