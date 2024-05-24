import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { ParticipatingUser } from "../../models/objects/ParticipatingUser";
import { useEffect, useState } from "react";
import { User } from "../../models/objects/User";
import { UserService } from "../../services/UserService";
import useUserInfo from "../../hooks/useUserInfo";

type Props = {
    isOpen: boolean,
    handleOpen: () => void,
    participants: ParticipatingUser[],
    onConfirm: (newParticipantsId: number[]) => void,
}

const AddParticipantModal = ({ isOpen, handleOpen, onConfirm, participants }: Props) => {
    const [newParticipants, setNewParticipants] = useState<number[]>([]);
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const { userId } = useUserInfo();

    const filterUsers = (users: User[], participants: ParticipatingUser[]): User[] => {
        const filteredUsers = users.filter(user => !participants.some(participant => {
            return participant.user.id === user.id || user.id === userId
        }));
        return filteredUsers;
    }

    const fetchUsers = () => {
        UserService.list().then((users) => {
            users = filterUsers(users, participants);
            setUsers(users);
        });
    }

    useEffect(() => {
        if (!isOpen) return;
        fetchUsers();
    }, [isOpen]);

    return (<Dialog open={isOpen} handler={onConfirm} className="bg-dark-blue border">
        <DialogHeader className="text-white border-0 border-b flex justify-between">
            Agregar Participantes
            <div className="relative flex w-full gap-2 md:w-max">
                <Input type="search" placeholder="Buscar Usuarios" crossOrigin={"false"}
                    containerProps={{
                        className: "min-w-[200px]",
                    }}
                    className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                <div className="!absolute left-3 top-[13px]">
                    <svg width="13" height="14" viewBox="0 0 14 15" fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                            fill="#CFD8DC" />
                        <path
                            d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                            stroke="#CFD8DC" strokeWidth="2" strokeLinecap="round" 
                            strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </DialogHeader>
        <DialogBody className="text-white overflow-y-scroll scroll-container max-h-[50vh]">
            <table className="mt-3 w-full text-center">
                <thead>
                    <tr>
                        <td className="w-1/2">
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Nombre
                            </Typography>
                        </td>
                        <td className="w-1/2">
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Correo
                            </Typography>
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        <tr key={"availableUser" + user.id} className="pt-5">
                            <td className="pt-2">
                                <Typography color="white">
                                    {user.first_name + ' ' + user.last_name}
                                </Typography>
                            </td>
                            <td className="pt-2">
                                <Typography color="white">
                                    {user.email}
                                </Typography>
                            </td>
                            <td className="pt-2">
                                <Button color="light-blue" onClick={() => {
                                    newParticipants.includes(user.id) ? 
                                    newParticipants.splice(newParticipants.indexOf(user.id), 1) :
                                    newParticipants.push(user.id)
                                    setNewParticipants([...newParticipants]);
                                }} size="sm">
                                    {newParticipants.includes(user.id) ? "Quitar" : "Agregar"}
                                </Button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </DialogBody>
        <DialogFooter className="border-0 border-t">
            <Button variant="gradient" color="red" onClick={handleOpen} className="mr-1">
                <span>Cancelar</span>
            </Button>
            <Button variant="gradient" color="green" onClick={() => onConfirm(newParticipants)}>
                <span>Confirmar</span>
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default AddParticipantModal;