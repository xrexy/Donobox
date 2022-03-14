import React from 'react';

interface Component {
  component: React.JSXElementConstructor<React.PropsWithChildren<any>>;
  options: {};
}

interface Props {
  components: Array<Component>;
  children: React.ReactNode;
}

export default function Compose(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight(
        (acc, { component: Comp, options }) => (
          <Comp {...options}>{acc}</Comp>
        ),
        children
      )}
    </>
  );
}
