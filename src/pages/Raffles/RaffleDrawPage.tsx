import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import NavbarComponent from "../../Components/NavbarComponent";
import { useEffect, useState } from "react";
import { Raffle } from "../../models/objects/Raffle";
import { RaffleService } from '../../services/RaffleService';
import { useNavigate, useParams } from "react-router-dom";
import { ParticipatingUser } from "../../models/objects/ParticipatingUser";
import { Routes } from "../../routes/CONSTANTS";

const RaffleDrawPage = () => {
    const [raffle, setRaffle] = useState<Raffle | undefined>();
    const [isAmountModalOpen, setIsAmountModalOpen] = useState(true)
    const [winnersAmount, setWinnersAmount] = useState(0)
    const [modalError, setModalError] = useState('')
    const [winners, setWinners] = useState<ParticipatingUser[]>([])
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchRaffle = () => {
        RaffleService.getById(parseInt(id!)).then((raffle) => {
            setRaffle(raffle);
        });
    }

    const fetchWinners = () => {
        RaffleService.winners(parseInt(id!)).then((winners) => {
            setWinners(winners);
        });
    }

    const closeAmountModal = () => {
        if (winnersAmount < 1) {
            setModalError("Debe ingresar una cantidad de ganadores mayor a 0")
            return;
        }
        RaffleService.start(parseInt(id!)).then(() => {
            localStorage.setItem('winnersRaffleN' + id, winnersAmount.toString());
            setIsAmountModalOpen(false);
        });
    }

    const drawWinner = () => {
        RaffleService.draw(parseInt(id!)).then((winner) => {
            winners.push(winner);
            setWinners([...winners]);
            console.log(winners)
            if (winners.length === winnersAmount) {
                RaffleService.finish(parseInt(id!)).then(() => {
                    navigate(Routes.RAFFLES.DETAIL_PARAM(parseInt(id!)));
                });
            }
        });
    }

    useEffect(() => {
        fetchRaffle();
        const savedWinnersAmount = localStorage.getItem('winnersRaffleN' + id);
        if (savedWinnersAmount) {
            setWinnersAmount(parseInt(savedWinnersAmount));
            setIsAmountModalOpen(false);
        }
        fetchWinners();
    }, []);

    return (<>
        <NavbarComponent />
        <div className="p-5 container mx-auto">
            <div className="flex justify-between">
                <Typography color="white" variant="h1">
                    Sorteo de {raffle?.name}
                </Typography>
                <Button className="ml-3 capitalize h-fit w-fit p-3 rounded-full"
                    size="lg" color="light-blue"
                    onClick={() => drawWinner()}>
                    <span>Obtener Siguiente Ganador</span>
                </Button>
            </div>
            {winners.length === 0 &&
                <Typography color="white" variant={"h4"}
                    className="mt-4 text-center">
                    Lista de Ganadores
                </Typography>}
            <table className="mt-3 w-full text-center">
                <thead>
                    <tr>
                        <td className="w-1/3">
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Nombre
                            </Typography>
                        </td>
                        <td className="w-1/3">
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Correo
                            </Typography>
                        </td>
                        <td className="w-1/3">
                            <Typography color="white" className="font-bold text-light-blue-400">
                                Teléfono
                            </Typography>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {winners.map((winner) => (
                        <tr key={"winner" + winner.id} className="pt-5">
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
                            <td className="pt-2">
                                <Typography color="white">
                                    {winner.user.phone}
                                </Typography>
                            </td>
                        </tr>))}
                </tbody>
            </table>
            {winners.length === 0 &&
                <Typography color="white"
                    className="mt-4 text-center font-normal text-blue-gray-200">
                    Aun no hay ganadores
                </Typography>}
        </div>
        <Dialog open={isAmountModalOpen} className="bg-dark-blue border"
            handler={() => closeAmountModal()}>
            <DialogHeader className="text-white border-0 border-b">Cantidad de Ganadores</DialogHeader>
            <DialogBody className="text-white">
                {modalError &&
                    <Typography color="red" className="mb-5">{modalError}</Typography>
                }
                <Input type="number" color="light-blue" placeholder="Cantidad de Ganadores" className="text-white"
                    label="Cantidad de Ganadores" crossOrigin={undefined} value={winnersAmount} min={1}
                    onChange={(e) => setWinnersAmount(parseInt(e.target.value))} />
            </DialogBody>
            <DialogFooter className="border-0 border-t">
                <Button variant="gradient" color="green" onClick={() => closeAmountModal()}>
                    <span>Confirmar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>);
}

export default RaffleDrawPage;