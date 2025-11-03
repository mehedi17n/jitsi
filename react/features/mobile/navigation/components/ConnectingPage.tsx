import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

// Import the main Conference component and required parts
import BrandingImageBackground from '../../../dynamic-branding/components/native/BrandingImageBackground';
import Filmstrip from '../../../filmstrip/components/native/Filmstrip';
import LargeVideo from '../../../large-video/components/LargeVideo.native';
import Toolbox from '../../../toolbox/components/native/Toolbox';
import Container from '../../../base/react/components/native/Container';
import { getCallingState } from '../../../base/conference/functions';
import { getConferenceState } from '../../../base/conference/functions';
import PulsingCallIcon from './PulsingCallIcon';

import { navigationStyles } from './styles';

interface IProps {
    /**
     * Navigation object provided by React Navigation.
     */
    navigation?: any;
}

const ConnectingPage = ({ navigation }: IProps) => {
    const { t } = useTranslation();
    
    // Check if we're in calling state (when "Calling..." status appears AND ringing sound starts)
    // When isInCallingState is true, the calling sound is playing and UI shows "Calling..."
    const isInCallingState = useSelector(getCallingState);
    const conferenceState = useSelector((state: any) => getConferenceState(state));
    
    // Show overlay UNTIL "Calling..." status appears and ringing sound starts
    // The overlay hides when calling state becomes active (isInCallingState = true)
    // This provides a WhatsApp-like smooth experience - user sees clean overlay immediately,
    // then it transitions to show "Calling..." with ringing sound
    const showOverlay = !isInCallingState;

    const handleLargeVideoClick = useCallback(() => {
        // Handle click interactions - can be used to hide/show toolbox
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {/* Main Conference UI - Clean and Direct */}
            <Container style={[navigationStyles.conferenceContainer]}>
                <BrandingImageBackground />
                
                {/* Large Video Area */}
                <LargeVideo onClick={handleLargeVideoClick} />
                
                {/* Bottom Toolbar Container */}
                <View style={navigationStyles.toolboxAndFilmstripContainer as ViewStyle}>
                    {/* Filmstrip (participant thumbnails) */}
                    <Filmstrip />
                    
                    {/* Toolbox (Bottom Toolbar with controls) */}
                    <Toolbox />
                </View>
            </Container>
            
            {/* Loading Overlay - WhatsApp-like smooth experience, no text, just pulsing icon */}
            {showOverlay && (
                <View style={[navigationStyles.connectingOverlay as ViewStyle]}>
                    <PulsingCallIcon size={170} />
                </View>
            )}
        </View>
    );
};

export default ConnectingPage;
