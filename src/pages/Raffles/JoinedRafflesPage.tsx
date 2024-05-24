import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Raffle } from '../../models/objects/Raffle';
import { UserService } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes/CONSTANTS';
import useUserInfo from '../../hooks/useUserInfo';
import NavbarNext from '../../Components/NavbarNext';
import { IconCancel } from '../../assets/icons/icons';
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
const JoinedRafflesPage = () => {
    const [raffles, setRaffles] = useState<Raffle[]>([]);
    const navigate = useNavigate();
    const { userId } = useUserInfo()

    const fetchRaffles = () => {
        UserService.participatingRaffles(userId).then((raffles) => {
            setRaffles(raffles);
        })
    }

    useEffect(() => {
        if (!userId) return
        fetchRaffles()
    }, [userId])

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center">
            <section className="gap-4 py-8 w-[1280px] px-6">
                <Typography color="white" variant="h3" className="text-foreground mb-3">
                    Current Raffles Participation
                </Typography>
                <div className="flex flex-wrap gap-5 justify-center">
                    {raffles.length === 0 &&
                        <div className="w-full text-center mt-60">
                            <IconCancel className="mx-auto text-foreground" />
                            <Typography color="white" className="text-xl mt-4 text-foreground">
                                No raffles in
                            </Typography>
                        </div>
                    }
                    <div className="grid grid-cols-2 w-full gap-6 mt-4">
                        {raffles.map((raffle) => {
                            return <Card key={raffle.id} isBlurred className="border-2">
                                <CardHeader>
                                    <div>
                                        <div className="font-bold text-lg">{raffle.name}</div>
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
                                    </div>
                                </CardBody>
                            </Card>
                        })}
                    </div>
                </div>
            </section>
        </div>
    </>);
}

export default JoinedRafflesPage;