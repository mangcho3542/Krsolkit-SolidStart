import { ComponentProps } from "@/types/ComponentProps";
import { AllColorType } from "@/types/ColorType";
import { JSX, splitProps } from "solid-js";

export interface SvgProps
  extends Omit<ComponentProps, "children">,
    Omit<JSX.SvgSVGAttributes<SVGSVGElement>, "style"> {
  value: string;
  color?: AllColorType;
  style?: JSX.CSSProperties;
}

export function Svg(props: SvgProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "classList",
    "id",
    "style",
    "value",
    "color",
  ]);
  let svgRef: SVGSVGElement | undefined;

  function toCamel(name: string) {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }

  const setRef = (el?: SVGSVGElement) => {
    svgRef = el;
    if (!svgRef) return;
    if (!local.value) {
      svgRef.innerHTML = "";
      return;
    }

    
    const parser = new DOMParser();
    const doc = parser.parseFromString(local.value, "image/svg+xml");
    const parsedSvg = doc.querySelector("svg");

    if (!parsedSvg) {
      svgRef.innerHTML = local.value;
      return;
    }

    
    svgRef.innerHTML = parsedSvg.innerHTML;

    
    for (const attr of Array.from(parsedSvg.attributes)) {
      const name = attr.name;
    
      if (name === "class" || name === "id" || name === "style") continue;

      const camel = toCamel(name);
    
      const userProvided =
        (rest as any)[camel] !== undefined || (rest as any)[name] !== undefined;
      if (!userProvided) {
    
        svgRef.setAttribute(name, attr.value);
      }
    }

    
    if (local.color !== undefined) {
      try {
        svgRef.style.color = local.color;
      } catch {
        // 아무 일도 안 함
      }
    }

    const hasParsedFill = parsedSvg.hasAttribute("fill");
    const userFillProvided = (rest as any).fill !== undefined;
    const hasRefFill = svgRef.hasAttribute("fill");
    if (!hasParsedFill && !userFillProvided && !hasRefFill) {
      svgRef.setAttribute("fill", "var(--svg-color)");
    }
  };

  return (
    <svg
      ref={setRef}
      class={local.class}
      classList={local.classList}
      id={local.id}
      {...(rest)}
    />
  );
}

export default Svg;