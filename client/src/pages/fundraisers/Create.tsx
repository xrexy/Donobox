import RichTextEditor from '@mantine/rte';
import React from 'react';
import { Shell } from '../../components/Shell';

interface Props {}

export const CreateFundraiserPage: React.FC<Props> = () => (
  <Shell>
    <RichTextEditor
      controls={[
        ['bold', 'italic', 'underline', 'link', 'image'],
        ['unorderedList', 'h1', 'h2', 'h3'],
        ['sup', 'sub'],
        ['alignLeft', 'alignCenter', 'alignRight'],
      ]}
      value=""
      onChange={() => {}}
    />
  </Shell>
);
