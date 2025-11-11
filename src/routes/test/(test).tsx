import Btn from "@/components/Btn";
import { Toaster, createToaster } from "@/components/Toaster";

export default function test() {
  const toaster = createToaster({
    placement: "bottom-end",
    overlap: true,
    gap: 10,
    duration: Infinity,
  });

  return (
    <main class="Main" style={{"align-items": "center"}}>
      <Toaster toast={toaster} />
      <Btn onClick={() => {toaster.create({
        title: "Title",
        description: "Desc",
        type: "info"
      });
      console.log("클릭됨.");
      }}>
        버튼
      </Btn>
    </main>
  );
}