import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
	useDisclosure,
  Input,
  Divider
} from "@nextui-org/react";
import { nav_ui, social } from '@/app/_components/ui/Icons'
import Link from "next/link";


export function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Mystical Realms Login</ModalHeader>
							<ModalBody>
              <Input label='Username' variant='underlined' startContent={nav_ui.user}/>
                <Input type='password' label='Password' variant='underlined' startContent={nav_ui.lock} />
                <Divider />
                <Button className="w-full" as={Link} href="/api/auth/signin">{social.google}{' '}Google</Button>
                <Button className="w-full" as={Link} href='/api/auth/signin'>{social.discord}{' '}Discord</Button>
                {/* <Button className='w-full'>Facebook</Button> */}
                <Button className='w-full' as={Link} href="/api/auth/signin">{social.github}{' '}GitHub</Button>
							</ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={onClose}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
