// src/components/Svg.tsx
import { ComponentBaseProps } from "@/types/ComponentProps";
import { AllColorType } from "@/types/ColorType";
import { JSX, splitProps } from "solid-js";

export interface SvgProps
  extends Omit<ComponentBaseProps, "children">,
    JSX.SvgSVGAttributes<SVGSVGElement> {
  value: string;
  color?: AllColorType;
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

    // 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(local.value, "image/svg+xml");
    const parsedSvg = doc.querySelector("svg");

    if (!parsedSvg) {
      // 만약 svg 태그가 없으면 그냥 raw를 innerHTML에 집어넣자 (비정상 케이스 대비)
      svgRef.innerHTML = local.value;
      return;
    }

    // 1) 내부 컨텐츠 복사
    svgRef.innerHTML = parsedSvg.innerHTML;

    // 2) parsed svg의 속성들을 복사하되, 사용자(props)로 전달된 속성은 덮어쓰지 않음
    for (const attr of Array.from(parsedSvg.attributes)) {
      const name = attr.name;
      // 건드리지 않을 속성들: class, id, style 은 컴포넌트 props로 다루므로 건너뜀
      if (name === "class" || name === "id" || name === "style") continue;

      const camel = toCamel(name);
      // 사용자가 같은 속성을 props로 넘겼는지 확인 (JSX props는 camelCase일 가능성)
      const userProvided =
        (rest as any)[camel] !== undefined || (rest as any)[name] !== undefined;
      if (!userProvided) {
        // 안전하게 그대로 설정
        svgRef.setAttribute(name, attr.value);
      }
    }

    // 3) 스타일: local.color가 정의되어 있으면 color 스타일로 설정
    if (local.color !== undefined && local.color !== null) {
      // string 계열이라고 가정
      try {
        // @ts-ignore
        svgRef.style.color = String(local.color);
      } catch {
        // 아무 일도 안 함
      }
    } else if (local.style && typeof local.style === "object") {
      // 만약 사용자가 style prop으로 color를 직접 줬다면 이미 반영되어 있을 것임 (spread로 넘어감)
    }

    // 4) fill 기본값 설정:
    // - parsedSvg에 fill이 없고
    // - 사용자 props(rest).fill이 없고
    // - svgRef에 이미 fill이 없을 때만 기본값 부여
    const hasParsedFill = parsedSvg.hasAttribute("fill");
    const userFillProvided = (rest as any).fill !== undefined;
    const hasRefFill = svgRef.hasAttribute("fill");
    if (!hasParsedFill && !userFillProvided && !hasRefFill) {
      svgRef.setAttribute("fill", "var(--svg-color)");
    }
  };

  // 렌더: div 없이 직접 <svg/>
  // class, classList, id는 분리해서 전달
  return (
    <svg
      ref={setRef}
      class={local.class}
      classList={local.classList}
      id={local.id}
      {...(rest as JSX.SvgSVGAttributes<SVGSVGElement>)}
      // style prop을 사용자가 주었으면 그게 우선. local.color가 있으면 
      // setRef에서 style.color를 덮어씀.
    />
  );
}

export default Svg;