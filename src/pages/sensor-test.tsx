import { useState, useEffect, useCallback } from 'react';
import { MapPin, Navigation, AlertCircle, Wifi, Satellite } from 'lucide-react';


interface LocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
    source: 'high-accuracy' | 'standard';
}


export default function LocationTracker() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<string>('');
    const [isTracking, setIsTracking] = useState(false);


    const startTracking = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return null;
        }

        setIsTracking(true);
        setError('');

        // First try high accuracy, then fall back to standard
        const id = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    source: 'high-accuracy',
                });
                setError('');
            }, (err) => {
                console.log({ err });
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            timestamp: position.timestamp,
                            source: 'standard',
                        });
                        setError('');
                    }, (fallbackErr) => {console.log({ fallbackErr })}, {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

        return id
    }, []);

    
    const stopTracking = useCallback((trackingId:number|null) => {
        if (trackingId !== null) {
            navigator.geolocation.clearWatch(trackingId);
        }
        setIsTracking(false);
    }, []);


    useEffect(() => {
        let trackingId = startTracking();
        console.log({ trackingId });

        return () => {
            console.log({ cleanned: trackingId });
            stopTracking(trackingId);
        };
    }, [startTracking, stopTracking])



    return (
        <div>
            <div>
                <div>
                    <div>
                        <Navigation />
                        <h1>
                            Sensor Test
                        </h1>
                    </div>
                    <div>
                        {isTracking && (
                            <div>
                                <div></div>
                                <span className="font-medium">Tracking active</span>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div>
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-red-800 font-semibold mb-1">Error</p>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {location && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                    <h2 className="text-xl font-bold text-gray-800">Location Data</h2>
                                </div>
                                <div className="flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full">
                                    {location.source === 'high-accuracy' ? (
                                        <>
                                            <Satellite className="w-4 h-4 text-green-600" />
                                            <span className="text-green-700 font-medium">GPS</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wifi className="w-4 h-4 text-blue-600" />
                                            <span className="text-blue-700 font-medium">Network</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Latitude</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {location.latitude}°
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Longitude</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {location.longitude}°
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        ±{location.accuracy.toFixed(2)} meters
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {new Date(location.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}