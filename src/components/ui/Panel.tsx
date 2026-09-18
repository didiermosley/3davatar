"use client";

import {
  accessories,
  backgrounds,
  beards,
  bottoms,
  clothColors,
  dresses,
  expressions,
  eyeColors,
  forGender,
  hairColors,
  hairStyles,
  mustaches,
  shoeColors,
  shoes,
  skinColors,
  tops,
} from "@/lib/avatar/options";
import { useAvatar } from "@/lib/avatar/store";
import { ColorPicker } from "./ColorPicker";
import { GenderToggle } from "./GenderToggle";
import { OptionGrid } from "./OptionGrid";
import { Field, Section } from "./Section";
import { Toolbar } from "./Toolbar";

export function Panel() {
  const config = useAvatar((s) => s.config);
  const set = useAvatar((s) => s.set);
  const setGender = useAvatar((s) => s.setGender);
  const { gender } = config;
  const male = gender === "male";
  const wearingDress = config.dress !== "none";

  return (
    <div className="flex flex-col gap-5">
      <Section title="Actions">
        <Toolbar />
      </Section>

      <Section title="Gender">
        <GenderToggle value={gender} onChange={setGender} />
      </Section>

      <Section title="Body">
        <Field label="Skin">
          <ColorPicker presets={skinColors} value={config.skinColor} onChange={(v) => set({ skinColor: v })} />
        </Field>
        <Field label="Eyes">
          <ColorPicker presets={eyeColors} value={config.eyeColor} onChange={(v) => set({ eyeColor: v })} />
        </Field>
        <Field label="Expression">
          <OptionGrid options={expressions} value={config.expression} onChange={(v) => set({ expression: v })} />
        </Field>
      </Section>

      <Section title="Hair">
        <Field label="Style">
          <OptionGrid
            options={forGender(hairStyles, gender)}
            value={config.hairStyle}
            onChange={(v) => set({ hairStyle: v })}
          />
        </Field>
        <Field label="Color">
          <ColorPicker presets={hairColors} value={config.hairColor} onChange={(v) => set({ hairColor: v })} />
        </Field>
      </Section>

      {male && (
        <Section title="Facial hair">
          <Field label="Mustache">
            <OptionGrid options={mustaches} value={config.mustache} onChange={(v) => set({ mustache: v })} />
          </Field>
          <Field label="Beard">
            <OptionGrid options={beards} value={config.beard} onChange={(v) => set({ beard: v })} />
          </Field>
        </Section>
      )}

      <Section title="Outfit">
        {!male && (
          <Field label="Dress">
            <OptionGrid options={dresses} value={config.dress} onChange={(v) => set({ dress: v })} />
            {wearingDress && (
              <ColorPicker presets={clothColors} value={config.dressColor} onChange={(v) => set({ dressColor: v })} />
            )}
          </Field>
        )}
        {!wearingDress && (
          <>
            <Field label="Top">
              <OptionGrid options={tops} value={config.top} onChange={(v) => set({ top: v })} />
              <ColorPicker presets={clothColors} value={config.topColor} onChange={(v) => set({ topColor: v })} />
            </Field>
            <Field label="Bottom">
              <OptionGrid
                options={forGender(bottoms, gender)}
                value={config.bottom}
                onChange={(v) => set({ bottom: v })}
              />
              <ColorPicker presets={clothColors} value={config.bottomColor} onChange={(v) => set({ bottomColor: v })} />
            </Field>
          </>
        )}
      </Section>

      <Section title="Shoes">
        <Field label="Style">
          <OptionGrid options={forGender(shoes, gender)} value={config.shoes} onChange={(v) => set({ shoes: v })} />
        </Field>
        <Field label="Color">
          <ColorPicker presets={shoeColors} value={config.shoeColor} onChange={(v) => set({ shoeColor: v })} />
        </Field>
      </Section>

      <Section title="Extras">
        <Field label="Accessory">
          <OptionGrid options={accessories} value={config.accessory} onChange={(v) => set({ accessory: v })} />
          {config.accessory !== "none" && config.accessory !== "glasses" && config.accessory !== "sunglasses" && (
            <ColorPicker
              presets={clothColors}
              value={config.accessoryColor}
              onChange={(v) => set({ accessoryColor: v })}
            />
          )}
        </Field>
        <Field label="Background">
          <ColorPicker presets={backgrounds} value={config.background} onChange={(v) => set({ background: v })} />
        </Field>
      </Section>
    </div>
  );
}
