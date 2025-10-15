import { MapPin, Navigation, AlertCircle, Wifi, Satellite } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Styled from "styled-components";


interface LocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
    source: 'high-accuracy' | 'standard';
}



export default function LocationTracker() {
    const [posTarget, setPositionTarget] = useState<LocationData | null>(null);
    const [location, setLocation] = useState<LocationData | null>(null);
    const [targetDist, setTargetDist] = useState<number>(0);
    const [isTracking, setIsTracking] = useState(false);
    const [error, setError] = useState<string>('');


    const calcTargetDist = useCallback(() => {
        if (posTarget != null && location != null) {
            const targetDistResult = Math.hypot(posTarget.latitude - location.longitude, posTarget.latitude - location.longitude);
            setTargetDist(targetDistResult);            
        }
    }, [posTarget, location])


    const defineTargetLocation = useCallback(() => {
        setPositionTarget(location);
    }, [location])


    const startTracking = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return null;
        }

        setIsTracking(true);
        setError('');

        const id = navigator.geolocation.watchPosition(
            (position) => {
                // console.log({position});
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    source: 'high-accuracy',
                });
                setError('');
                calcTargetDist();
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
                        calcTargetDist();
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
    }, [calcTargetDist]);

    
    const stopTracking = useCallback((trackingId:number|null) => {
        if (trackingId != null) {
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
                        <div>
                            <button onClick={defineTargetLocation}>set target position</button>
                        </div>
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
                    {posTarget && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                    <h2 className="text-xl font-bold text-gray-800">Target Location Data</h2>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Latitude</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {posTarget.latitude}°
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Longitude</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {posTarget.longitude}°
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        ±{posTarget.accuracy.toFixed(2)} meters
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        {new Date(posTarget.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
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
                <p>distance: {targetDist}</p>
            </div>
        </div>
    );
}