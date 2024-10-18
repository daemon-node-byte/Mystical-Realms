import { Button, ButtonGroup } from '@nextui-org/react'

type Props = {
  readonly addCard: () => void
}

export default function PlacementAreaControls({ addCard }: Props) {
  const btnStyle = "w-full sm:w-auto";
  return (
    <div className="p-6">
      <h2>Controls</h2>
      <ButtonGroup>
        <Button onClick={addCard} className={btnStyle}>
          Add Card
        </Button>
        <Button className={btnStyle}>Remove Card</Button>
        <Button className={btnStyle}>Lock Card</Button>
      </ButtonGroup>
      <h2 className="mt-4">Layout</h2>
      <ButtonGroup>
        <Button className={btnStyle}>Save Layout</Button>
        <Button className={btnStyle}>Load Layout</Button>
        <Button className={btnStyle}>Reset Layout</Button>
      </ButtonGroup>
    </div>
  );
}