import { useEffect, useState } from "react";
import { Raffle } from "../../models/objects/Raffle";
import { RaffleService } from "../../services/RaffleService";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import AddIcon from "../../Components/svgs/AddIcon";
import DeleteIcon from "../../Components/svgs/DeleteIcon";
import DeleteModal from "../../Components/modals/DeleteModal";
import { getStatusDisplay } from "../../utilities/RaffleUtils";
import { UserService } from "../../services/UserService";
import useUserInfo from "../../hooks/useUserInfo";
import NavbarNext from "../../Components/NavbarNext";
import { IconCancel } from "../../assets/icons/icons";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

const MyRafflesPage = () => {
    const [raffles, setRaffles] = useState<Raffle[]>([]);
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idForDelete, setIdForDelete] = useState(0);
    const { userId } = useUserInfo()

    const fetchRaffles = () => {
        UserService.createdRaffles(userId).then((raffles) => {
            setRaffles(raffles);
        })
    }

    const deleteRaffle = () => {
        RaffleService.delete(idForDelete).then(() => {
            setOpenDeleteModal(!openDeleteModal);
            fetchRaffles();
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDeleteClick = (raffleId: number) => {
        setIdForDelete(raffleId);
        setOpenDeleteModal(true);
    }

    useEffect(() => {
        if (!userId) return
        fetchRaffles()
    }, [userId])

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center">
            <section className="gap-4 py-4 w-[1280px] px-6">
                <div className="flex items-center justify-between">
                    <Typography color="white" variant="h3" className="text-foreground">
                        My Raffles
                    </Typography>
                    <Button
                        variant="bordered"
                        onClick={() => navigate(Routes.RAFFLES.CREATE)}>
                        Create Raffle
                    </Button>
                </div>
                <div className="flex flex-wrap gap-5 justify-center">
                    {raffles.length === 0 &&
                        <div className="w-full text-center mt-60">
                            <IconCancel className="mx-auto text-foreground" />
                            <Typography color="white" className="text-xl mt-4 text-foreground">
                                Raffles not created
                            </Typography>
                        </div>
                    }
                    <div className="grid grid-cols-2 w-full gap-6 mt-4">
                        {raffles.map((raffle) => {
                            return <Card key={raffle.id} isBlurred className="border-2">
                                <CardHeader>
                                    <div>
                                        <div className="font-bold text-lg">{raffle.name}</div>
                                        <div className="text-sm text-foreground-500">
                                            Status: {getStatusDisplay(raffle.status)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="grid grid-cols-[1fr_auto] items-center gap-4">
                                    <div className="space-y-1">
                                        <p className="text-lg font-medium mt-2">
                                            Amount of tickets: {raffle.ticket_amount}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            color="primary"
                                            onClick={() => navigate(Routes.RAFFLES.DETAIL_PARAM(raffle.id))}>
                                            View raflle
                                        </Button>
                                        <span
                                            className="hover:bg-danger/15 rounded-full p-2"
                                            onClick={() => handleDeleteClick(raffle.id!)}>
                                            <DeleteIcon width={24} height={24} className="cursor-pointer text-danger" />
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        })}
                    </div>
                </div>
            </section>
        </div>


        <DeleteModal isOpen={openDeleteModal} handleOpen={() => setOpenDeleteModal(!openDeleteModal)}
            onConfirm={() => deleteRaffle()} title="Eliminar Rifa"
            message="¿Desea eliminar esta rifa?" />
    </>);
}

export default MyRafflesPage;