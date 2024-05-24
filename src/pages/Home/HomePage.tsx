import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Raffle } from "../../models/objects/Raffle";
import { RaffleService } from "../../services/RaffleService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import useUserInfo from "../../hooks/useUserInfo";
import NavbarNext from "../../Components/NavbarNext";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { IconCancel } from "../../assets/icons/icons";

const HomePage = () => {
    const [raffles, setRaffles] = useState<Raffle[]>([])
    const navigate = useNavigate()
    const { userId } = useUserInfo()

    const fetchRaffles = () => {
        if (!userId) return
        RaffleService.actives(userId).then((raffles) => {
            setRaffles(raffles)
        }).catch((error) => {
            console.error(error)
        })
    }

    const joinRaffle = (raffleId: number) => {
        if (!userId) return
        RaffleService.participate(raffleId, userId).then((raffle) => {
            const updatedRaffles = raffles.map((oldRaffle) => oldRaffle.id === raffle.id ? raffle : oldRaffle)
            setRaffles(updatedRaffles);
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        fetchRaffles()
    }, [userId])

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center">
            <section className="gap-4 py-8 w-[1280px] px-6">
                <Typography color="white" variant="h3" className="text-foreground mb-3">
                    Raffles Available
                </Typography>
                <div className="flex flex-wrap gap-5 justify-center">
                    {raffles.length === 0 &&
                        <div className="w-full text-center mt-60">
                            <IconCancel className="mx-auto text-foreground" />
                            <Typography color="white" className="text-xl mt-4 text-foreground">
                                No raffles available
                            </Typography>
                        </div>
                    }
                    {raffles.map((raffle) => {
                        return <Card key={raffle.id} isBlurred className="border-2 w-full">
                            <CardHeader>
                                <div>
                                    <div className="font-bold text-lg">{raffle.name}</div>
                                    <div className="text-sm text-foreground-500">Come and join us in this exciting raffle for a chance to win fantastic prizes!</div>
                                </div>
                            </CardHeader>
                            <CardBody className="grid grid-cols-[1fr_auto] items-center gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ends in 7 days</p>
                                    <p className="text-lg font-medium">
                                        Amount of tickets: {raffle.ticket_amount}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        color="primary"
                                        className="w-28"
                                        onClick={() => navigate(Routes.RAFFLES.DETAIL_PARAM(raffle.id))}>
                                        View raffle
                                    </Button>
                                    <Button
                                        className={`${raffle.users.find((user) => user.id === userId) ? "cursor-not-allowed bg-foreground-50" : "Participate"} w-28`}
                                        onClick={() => {
                                            if (raffle.users.find((user) => user.id === userId)) return
                                            joinRaffle(raffle.id!)
                                        }}>
                                        {raffle.users.find((user) => user.id === userId) ? 'Participating' : 'Participate'}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    })}
                </div>

            </section>
        </div>

    </>);
}

export default HomePage;    