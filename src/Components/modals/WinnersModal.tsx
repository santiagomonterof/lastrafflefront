import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ParticipatingUser } from "../../models/objects/ParticipatingUser";
import { RaffleService } from "../../services/RaffleService";

type Props = {
    isOpen: boolean,
    handleOpen: () => void,
    raffleId: number,
    showPhone: boolean
}

const WinnersModal = ({ isOpen, handleOpen, raffleId, showPhone }: Props) => {
    const [winners, setWinners] = useState<ParticipatingUser[]>([]);

    const fetchWinners = () => {
        RaffleService.winners(raffleId).then((winners) => {
            setWinners(winners);
        });
    }

    useEffect(() => {
        if (!isOpen) return;
        fetchWinners();
        const intervalId = setInterval(() => {
            fetchWinners();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isOpen]);

    return (<Dialog open={isOpen} handler={handleOpen} className="bg-dark-blue border">
        <DialogHeader className="text-white border-0 border-b">Ganadores de la Rifa</DialogHeader>
        <DialogBody className="text-white">
            <table className="mt-3 w-full text-center">
                <thead>
                    <tr>
                        <td>
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Nombre
                            </Typography>
                        </td>
                        <td>
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Correo
                            </Typography>
                        </td>
                        {showPhone && <td>
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Teléfono
                            </Typography>
                        </td>}
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {winners.map((winner) => (
                        <tr key={"availablewinner.user" + winner.user.id} className="pt-5">
                            <td className="pt-2">
                                <Typography color="white">
                                    {winner.user.first_name + ' ' + winner.user.last_name}
                                </Typography>
                            </td>
                            <td className="pt-2">
                                <Typography color="white">
                                    {winner.user.email}
                                </Typography>
                            </td>
                            {showPhone && <td className="pt-2">
                                <Typography color="white">
                                    {winner.user.phone}
                                </Typography>
                            </td>}
                        </tr>))}
                </tbody>
            </table>
        </DialogBody>
        <DialogFooter className="border-0 border-t">
            <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Aceptar</span>
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default WinnersModal;