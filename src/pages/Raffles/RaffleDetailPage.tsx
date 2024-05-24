import { Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { useEffect, useState } from "react";
import { Raffle } from "../../models/objects/Raffle";
import { RaffleService } from "../../services/RaffleService";
import { getStatusDisplay } from "../../utilities/RaffleUtils";
import { ParticipatingUser } from "../../models/objects/ParticipatingUser";
import AddParticipantModal from "../../Components/modals/AddParticipantModal";
import WinnersModal from "../../Components/modals/WinnersModal";
import useUserInfo from "../../hooks/useUserInfo";
import NavbarNext from "../../Components/NavbarNext";
import { Button, Card } from "@nextui-org/react";

const RaffleDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [raffle, setRaffle] = useState<Raffle | undefined>();
    const [participatingUsers, setParticipatingUsers] = useState<ParticipatingUser[]>([]);
    const participatingUsersHeaders = ["Name", "Email", "Phone", "Ticket"];
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);
    const { userId } = useUserInfo()

    const fetchRaffle = () => {
        RaffleService.getById(parseInt(id!)).then((raffle) => {
            setRaffle(raffle);
        });
    }

    const fetchParticipatingUsers = () => {
        RaffleService.participating(parseInt(id!)).then((users) => {
            setParticipatingUsers(users);
        });
    }

    useEffect(() => {
        fetchRaffle();
        fetchParticipatingUsers();
    }, []);

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center">
            <section className="gap-4 py-4 w-[1280px] px-6">
                <div className="flex justify-between">
                    <Typography color="white" variant="h3" className="text-foreground">
                        Detail Raffle
                    </Typography>
                    {userId === raffle?.created_by.id && <Button variant="bordered"
                        onClick={() => navigate(Routes.RAFFLES.EDIT_PARAM(parseInt(id!)))}>
                        Edit Raffle
                    </Button>}
                </div>
                <div className="mt-4">
                    {raffle && <div className="flex justify-between">
                        <Typography color="white" variant="h4" className="text-foreground w-full">
                            {raffle.name}
                        </Typography>
                        {raffle.status !== 0 && userId === raffle.created_by.id && <Button variant="bordered"
                            onClick={() => navigate(Routes.RAFFLES.RAFFLE_DRAW_PARAM(raffle.id))}>
                            Draw Raffle
                        </Button>}
                    </div>}
                    <Card className="mt-4">
                        <table className="my-4 w-full text-center">
                            <thead>
                                <tr>
                                    <th className="w-1/3">
                                        <Typography className="text-primary font-bold">
                                            Raffle code
                                        </Typography>
                                    </th>
                                    <th className="w-1/3">
                                        <Typography className="text-primary font-bold">
                                            Tickets
                                        </Typography>
                                    </th>
                                    <th className="w-1/3">
                                        <Typography className="text-primary font-bold">
                                            Status
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {raffle && <Typography className="text-foreground">
                                            {raffle.ticket_code}
                                        </Typography>}
                                    </td>
                                    <td>
                                        {raffle && <Typography className="text-foreground">
                                            {raffle.ticket_amount - raffle.users.length + " / " + raffle.ticket_amount}
                                        </Typography>}
                                    </td>
                                    <td>
                                        {raffle && <Typography className="text-foreground">
                                            {getStatusDisplay(raffle.status)}
                                        </Typography>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
                <div className="mt-5">
                    <div className="flex justify-between">
                        <Typography color="white" variant="h4" className="w-full flex items-center">
                            Participants List
                        </Typography>
                        {userId === raffle?.created_by.id && raffle?.status !== 0 &&
                            <Button variant="bordered"
                                onClick={() => setIsAddModalOpen(true)}>
                                Add participants
                            </Button>}
                        {raffle?.status !== 1 &&
                            <Button variant="bordered"
                                onClick={() => setIsWinnersModalOpen(true)}>
                                Show winners
                            </Button>}
                    </div>
                    <div className="mt-6">
                        <Card>
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr className="border-b bg-foreground-100">
                                        {participatingUsersHeaders.map((head) => {
                                            if (head === "Teléfono" && userId !== raffle?.created_by.id) return null;
                                            return (
                                                <th key={head} className="p-4">
                                                    <Typography className="font-bold leading-none">
                                                        {head}
                                                    </Typography>
                                                </th>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {participatingUsers.map((participation, index) => (
                                        <tr key={'user' + index} className="hover:bg-foreground-100">
                                            <td className="ps-4 py-6">
                                                <Typography className="text-foreground">
                                                    {participation.user.first_name + " " +
                                                        participation.user.last_name}
                                                </Typography>
                                            </td>
                                            <td className="ps-4 py-6">
                                                <Typography className="text-foreground">
                                                    {participation.user.email}
                                                </Typography>
                                            </td>
                                            {userId === raffle?.created_by.id &&
                                                <td className="ps-4 py-6">
                                                    <Typography className="text-foreground">
                                                        {participation.user.phone}
                                                    </Typography>
                                                </td>}
                                            <td className="ps-4 py-6">
                                                <Typography className="text-foreground">
                                                    {participation.ticket_number}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </section>
        </div>






        <AddParticipantModal isOpen={isAddModalOpen} onConfirm={(newParticipantsId) => {
            const requests = newParticipantsId.map((newId) =>
                RaffleService.participate(parseInt(id!), newId)
            );
            Promise.all(requests).then(() => {
                fetchParticipatingUsers();
                setIsAddModalOpen(false);
            });
        }} handleOpen={() => setIsAddModalOpen(false)} participants={participatingUsers} />
        <WinnersModal isOpen={isWinnersModalOpen} handleOpen={() => setIsWinnersModalOpen(false)}
            raffleId={parseInt(id!)} showPhone={userId === raffle?.created_by.id} />
    </>);
}

export default RaffleDetailPage;