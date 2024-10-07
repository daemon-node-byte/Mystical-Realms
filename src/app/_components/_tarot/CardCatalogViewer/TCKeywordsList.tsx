import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import clsx from "clsx";
const ListJoin = ({ list }: { list: string[] }) => {
  return (
    <ul className={clsx('space-y-6 tracking-wide text-1xl text-center')}>
      {list.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};
export default function TCKeywordsLisT({
  upright,
  reversed,
}: {
  upright: string[];
  reversed: string[];
}) {
  return (
    <Card className="w-full">
      <CardBody className="flex items-center">
        <Tabs color="primary" size="lg" variant="underlined">
          <Tab key="upright" title="Upright">
            <Card>
              <CardBody>
                <ListJoin list={upright} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reversed" title="Reversed">
            <Card>
              <CardBody>
                <ListJoin list={reversed} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};