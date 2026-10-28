import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { MeowProvider } from '../src/theme/ThemeProvider';
import { Portal, PortalHost } from '../src/components/Portal/Portal';
import { Text } from '../src/components/Text/Text';
import { Dialog, AlertDialog } from '../src/components/Dialog/Dialog';
import { ToastProvider, useToast } from '../src/components/Toast/Toast';
import { Button } from '../src/components/Button/Button';
import { BottomSheet } from '../src/components/BottomSheet/BottomSheet';
import { Menu, MenuItem } from '../src/components/Menu/Menu';

describe('Portal', () => {
  it('teleports content to the host', async () => {
    await render(
      <PortalHost>
        <Text>outside</Text>
        <Portal>
          <Text>portaled</Text>
        </Portal>
      </PortalHost>
    );

    expect(screen.getByText('portaled')).toBeOnTheScreen();
    expect(screen.getByText('outside')).toBeOnTheScreen();
  });
});

describe('Dialog', () => {
  it('shows title and body when visible', async () => {
    await render(
      <MeowProvider>
        <Dialog visible title="Delete item" onDismiss={jest.fn()}>
          <Text>This cannot be undone.</Text>
        </Dialog>
      </MeowProvider>
    );

    expect(screen.getByText('Delete item')).toBeOnTheScreen();
    expect(screen.getByText('This cannot be undone.')).toBeOnTheScreen();
  });

  it('dismisses from the scrim', async () => {
    const onDismiss = jest.fn();
    await render(
      <MeowProvider>
        <Dialog visible title="Hi" onDismiss={onDismiss} />
      </MeowProvider>
    );

    fireEvent.press(screen.getByLabelText('Dismiss dialog'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('AlertDialog', () => {
  it('confirms then dismisses', async () => {
    const onConfirm = jest.fn();
    const onDismiss = jest.fn();
    await render(
      <MeowProvider>
        <AlertDialog
          visible
          title="Delete?"
          message="This action is permanent."
          onConfirm={onConfirm}
          onDismiss={onDismiss}
        />
      </MeowProvider>
    );

    fireEvent.press(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('Toast', () => {
  function Trigger() {
    const { show } = useToast();
    return <Button onPress={() => show({ message: 'Saved!' })}>Notify</Button>;
  }

  it('shows a toast when useToast().show is called', async () => {
    await render(
      <MeowProvider>
        <ToastProvider>
          <Trigger />
        </ToastProvider>
      </MeowProvider>
    );

    fireEvent.press(screen.getByText('Notify'));
    await waitFor(() => expect(screen.getByText('Saved!')).toBeOnTheScreen());
  });
});

describe('BottomSheet', () => {
  it('renders sheet content when visible', async () => {
    await render(
      <MeowProvider>
        <BottomSheet visible onDismiss={jest.fn()}>
          <Text>Sheet body</Text>
        </BottomSheet>
      </MeowProvider>
    );

    expect(screen.getByText('Sheet body')).toBeOnTheScreen();
  });
});

describe('Menu', () => {
  it('renders items and fires presses', async () => {
    const onPress = jest.fn();
    await render(
      <MeowProvider>
        <Menu visible onDismiss={jest.fn()} anchor={{ x: 10, y: 10 }}>
          <MenuItem label="Duplicate" onPress={onPress} />
        </Menu>
      </MeowProvider>
    );

    fireEvent.press(screen.getByText('Duplicate'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
