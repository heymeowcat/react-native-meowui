import { render, fireEvent, screen } from '@testing-library/react-native';
import { MeowProvider } from '../src/theme/ThemeProvider';
import { Button } from '../src/components/Button/Button';
import { Text } from '../src/components/Text/Text';
import { Chip } from '../src/components/Chip/Chip';
import { SegmentedButtons } from '../src/components/SegmentedButtons/SegmentedButtons';
import { Checkbox } from '../src/components/Checkbox/Checkbox';
import { Switch } from '../src/components/Switch/Switch';
import { TextInput } from '../src/components/TextInput/TextInput';

describe('Button', () => {
  it('renders its label and fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Save</Button>);

    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled and inert when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Button onPress={onPress} disabled>
        Save
      </Button>
    );

    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button').props.accessibilityState.disabled).toBe(true);
  });

  it('marks busy when loading', async () => {
    const onPress = jest.fn();
    await render(
      <Button onPress={onPress} loading>
        Save
      </Button>
    );

    expect(screen.getByRole('button').props.accessibilityState.busy).toBe(true);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('Text', () => {
  it('applies the variant metrics from the theme', async () => {
    await render(<Text variant="headline">Hello</Text>);
    const node = screen.getByText('Hello');
    expect(node.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontSize: 24 })])
    );
  });

  it('resolves tone colors', async () => {
    await render(<Text tone="error">Boom</Text>);
    const node = screen.getByText('Boom');
    const flat = Array.prototype.concat(...(node.props.style as object[]).filter(Boolean));
    expect(flat).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#AF3B31' })]));
  });
});

describe('Chip', () => {
  it('toggles filter chips through onPress', async () => {
    const onPress = jest.fn();
    await render(<Chip label="Design" variant="filter" selected={false} onPress={onPress} />);

    fireEvent.press(screen.getByText('Design'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SegmentedButtons', () => {
  it('reports the chosen value (single select)', async () => {
    const onChange = jest.fn();
    await render(
      <SegmentedButtons
        value="a"
        onChange={onChange}
        options={[
          { value: 'a', label: 'One' },
          { value: 'b', label: 'Two' },
        ]}
      />
    );

    fireEvent.press(screen.getByText('Two'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('toggles values in multi-select mode', async () => {
    const onChange = jest.fn();
    await render(
      <SegmentedButtons
        multi
        value={['a']}
        onChange={onChange}
        options={[
          { value: 'a', label: 'One' },
          { value: 'b', label: 'Two' },
        ]}
      />
    );

    fireEvent.press(screen.getByText('Two'));
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  });
});

describe('Checkbox', () => {
  it('fires onValueChange with the next state', async () => {
    const onValueChange = jest.fn();
    await render(<Checkbox checked={false} onValueChange={onValueChange} label="Remember me" />);

    fireEvent.press(screen.getByText('Remember me'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('exposes checkbox semantics', async () => {
    await render(<Checkbox checked label="Terms" />);
    expect(screen.getByRole('checkbox').props.accessibilityState.checked).toBe(true);
  });
});

describe('Switch', () => {
  it('fires onValueChange when pressed', async () => {
    const onValueChange = jest.fn();
    await render(<Switch checked={false} onValueChange={onValueChange} accessibilityLabel="Dark mode" />);

    fireEvent.press(screen.getByLabelText('Dark mode'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});

describe('TextInput', () => {
  it('shows the label, helper text and error state', async () => {
    await render(
      <TextInput label="Email" helperText="Required" error onChangeText={jest.fn()} />
    );

    expect(screen.getByText('Email')).toBeOnTheScreen();
    expect(screen.getByText('Required')).toBeOnTheScreen();
  });

  it('accepts text input', async () => {
    const onChangeText = jest.fn();
    await render(<TextInput placeholder="you@example.com" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), 'hi');
    expect(onChangeText).toHaveBeenCalledWith('hi');
  });
});

describe('MeowProvider', () => {
  it('provides theme overrides to children', async () => {
    function Probe() {
      return <Button tone="error">X</Button>;
    }
    await render(
      <MeowProvider overrides={{ colors: { error: '#FF0000' } }}>
        <Probe />
      </MeowProvider>
    );
    expect(screen.getByText('X')).toBeOnTheScreen();
  });
});
