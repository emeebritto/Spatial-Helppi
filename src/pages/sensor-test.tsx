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
    const [isLoading, setIsLoading] = useState(false);
    const [watchId, setWatchId] = useState<number | null>(null);

    const startTracking = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
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
                setIsLoading(false);
            },
            (err) => {
                console.error('High accuracy failed:', err);

                // If high accuracy fails, try standard accuracy
                const fallbackId = navigator.geolocation.watchPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            timestamp: position.timestamp,
                            source: 'standard',
                        });
                        setError('');
                        setIsLoading(false);
                    },
                    (fallbackErr) => {
                        setError(`Unable to get location: ${fallbackErr.message}`);
                        setIsTracking(false);
                        setIsLoading(false);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 15000,
                        maximumAge: 0, // Accept cached position up to 1 minute old
                    }
                );

                setWatchId(fallbackId);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // Increased to 10 seconds
                maximumAge: 0, // Accept cached position up to 30 seconds old
            }
        );

        setWatchId(id);
    }, []);

    
    const stopTracking = useCallback(() => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
        setIsTracking(false);
        setIsLoading(false);
    }, []);


    const getCurrentLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsLoading(true);
        setError('');

        // Try high accuracy first
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    source: 'high-accuracy',
                });
                setError('');
                setIsLoading(false);
            },
            (err) => {
                console.error('High accuracy failed, trying standard accuracy:', err);

                // Fallback to standard accuracy
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
                        setIsLoading(false);
                    },
                    (fallbackErr) => {
                        setError(`Unable to get location: ${fallbackErr.message}. Try enabling location services or using a different browser.`);
                        setIsLoading(false);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 15000,
                        maximumAge: 60000,
                    }
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000,
            }
        );
    }, []);

    useEffect(() => {
        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);

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
                        <div>
                            <button
                                onClick={getCurrentLocation}
                                disabled={isTracking || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div></div>
                                        Getting Location...
                                    </>
                                ) : (
                                    'Get Current Location'
                                )}
                            </button>

                            {!isTracking ? (
                                <button
                                    onClick={startTracking}
                                    disabled={isLoading}
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Start Tracking
                                </button>
                            ) : (
                                <button
                                    onClick={stopTracking}
                                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                >
                                    Stop Tracking
                                </button>
                            )}
                        </div>

                        {isTracking && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                <span className="font-medium">Tracking active</span>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-red-800 font-semibold mb-1">Error</p>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {location && (
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
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