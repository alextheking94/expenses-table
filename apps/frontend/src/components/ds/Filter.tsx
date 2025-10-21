import {
  Box,
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface FilterProps {
  title: string;
  filterOptions: Array<{
    id: string;
    selected: boolean;
    onClick: () => void;
    title: string;
  }>;
  queryConfig?: {
    active: boolean;
    onQueryChange?: (value: string) => void;
    placeholder?: string;
  };
  isMultiSelect?: boolean;
}

export const Filter = ({ title, filterOptions, queryConfig, isMultiSelect }: FilterProps) => {
  const [queryValue, setQueryValue] = useState('');

  return (
    <Popover placement="bottom-start" matchWidth>
      <PopoverTrigger>
        <Button variant="outline" size="sm">
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="sm">
        <PopoverArrow />
        <PopoverBody>
          <Box>
            {queryConfig?.active ? (
              <Input
                size="sm"
                placeholder={queryConfig.placeholder}
                value={queryValue}
                onChange={e => {
                  setQueryValue(e.target.value);
                  queryConfig.onQueryChange?.(e.target.value);
                }}
                mb={2}
              />
            ) : null}
            <List maxH="240px" overflowY="auto" spacing={1}>
              {filterOptions.map(option => (
                <ListItem key={option.id}>
                  {isMultiSelect ? ( /// potentially refactor to reuse the props
                    <Checkbox
                      size="sm"
                      variant={option.selected ? 'solid' : 'ghost'}
                      colorScheme={option.selected ? 'teal' : undefined}
                      w="100%"
                      justifyContent="flex-start"
                      onClick={() => option.onClick()}
                    >
                      <Text>{option.title}</Text>
                    </Checkbox>
                  ) : (
                    <Button
                      size="sm"
                      variant={option.selected ? 'solid' : 'ghost'}
                      colorScheme={option.selected ? 'teal' : undefined}
                      w="100%"
                      justifyContent="flex-start"
                      onClick={() => option.onClick()}
                    >
                      <Text>{option.title}</Text>
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
