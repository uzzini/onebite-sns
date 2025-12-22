import { Button } from "@/components/ui/button";
import { useDecreaseCount, useIncreaseCount } from "@/store/count";

export default function Controller() {
  const decrease = useDecreaseCount();
  const increase = useIncreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
