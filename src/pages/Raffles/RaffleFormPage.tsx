import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { RaffleService } from "../../services/RaffleService";
import { Routes } from "../../routes/CONSTANTS";
import { RaffleSaveRequest } from "../../models/requests/RaffleSaveRequest";
import useUserInfo from "../../hooks/useUserInfo";
import NavbarNext from "../../Components/NavbarNext";
import { Button, Card, Input } from "@nextui-org/react";

const RaffleFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [ticketAmount, setTicketAmount] = useState("");
    const [ticketCode, setTicketCode] = useState("");
    const { userId } = useUserInfo()

    const fetchRaffle = () => {
        if (!id) return;
        RaffleService.getById(parseInt(id)).then((raffle) => {
            setName(raffle.name);
            setTicketAmount(raffle.ticket_amount + "");
            setTicketCode(raffle.ticket_code);
        });
    }

    const createRaffle = (request: RaffleSaveRequest) => {
        RaffleService.create(request).then(() => {
            navigate(Routes.RAFFLES.MY_RAFFLES);
        }).catch(() => {
            setError("Ocurrió un error al crear la rifa");
        });
    }

    const updateRaffle = (request: RaffleSaveRequest) => {
        RaffleService.update(request).then(() => {
            navigate(Routes.RAFFLES.DETAIL_PARAM(parseInt(id!)));
        }).catch(() => {
            setError("Ocurrió un error al crear la rifa");
        });
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const request: RaffleSaveRequest = {
            name: name,
            ticket_amount: parseInt(ticketAmount),
            ticket_code: ticketCode,
            created_by_id: userId
        }
        if (!id) {
            createRaffle(request);
        } else {
            request.id = parseInt(id);
            updateRaffle(request);
        }
    }

    useEffect(() => {
        fetchRaffle();
    }, []);

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center my-24">
            <Card className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                <Typography variant="h4" className="text-foreground">
                    {id ? "Edit raffle" : "Create raffle"}
                </Typography>
                <form className="" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="red" className="-mb-3">
                            {error}
                        </Typography>
                        <div className="space-y-2">
                            <Input
                                className="w-full"
                                id="Name"
                                type="text"
                                label="Raffle Name"
                                value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Input
                                className="w-full"
                                id="Tickets"
                                type="text"
                                label="Number of Tickets"
                                value={ticketAmount} onChange={(e) => {
                                    setTicketAmount(e.target.value);
                                }} required />
                        </div>
                        <div className="space-y-2">
                            <Input
                                className="w-full"
                                id="Code"
                                type="text"
                                label="Ticket code"
                                value={ticketCode} onChange={(e) => setTicketCode(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button className="w-full" type="submit" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </Card>
        </div>

    </>);
}

export default RaffleFormPage;