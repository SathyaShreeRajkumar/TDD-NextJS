import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CARD_CONST } from '@/constants/app-constants'
import airlines from '@/lib/flights.json'

export default function AirlinePage() {
    return (
        <>
            <div className="flex gap-10 justify-center w-full mt-10">
                {airlines.map((flights) => (
                    <div key={flights.flightNumber}>
                        <Card className="w-full bg-blue-200">
                            <CardHeader>
                                <CardTitle>{flights.airline}</CardTitle>
                                <div className="flex gap-10 pt-5">
                                    <CardDescription className=" text-xl font-semibold">
                                        {flights.boarding}
                                    </CardDescription>
                                    <CardDescription className=" text-xl font-semibold">
                                        {flights.destination}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex gap-10 pt-5">
                                <p>{flights.departureDateTime}</p>
                                <p>{flights.arrivalDateTime}</p>
                            </CardContent>
                            <CardContent className="flex gap-20 pt-5">
                                <p>
                                    {flights.price} {CARD_CONST.INR}
                                </p>
                                <p>
                                    {CARD_CONST.SEATS} {flights.seatsAvailable}
                                </p>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <Button variant="default">{CARD_CONST.BOOK_NOW}</Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}
