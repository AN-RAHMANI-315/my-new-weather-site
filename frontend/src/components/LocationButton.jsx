import React from 'react';
import { Button } from './ui/button';
import { MapPin, Loader2 } from 'lucide-react';

const LocationButton = ({ onLocationRequest, loading, hasLocation }) => {
  return (
    <Button
      onClick={onLocationRequest}
      disabled={loading}
      variant={hasLocation ? "secondary" : "default"}
      className="mb-6"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Getting location...
        </>
      ) : (
        <>
          <MapPin className="w-4 h-4 mr-2" />
          {hasLocation ? 'Update location' : 'Get my location'}
        </>
      )}
    </Button>
  );
};

export default LocationButton;