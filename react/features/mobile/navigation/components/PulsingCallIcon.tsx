import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Icon from '../../../base/icons/components/Icon';
import { IconPhoneRinging } from '../../../base/icons/svg';

interface IProps {
    size?: number;
}

/**
 * Pulsing call icon component matching Android design.
 * Shows a pulsing phone icon with animated scale and alpha.
 */
const PulsingCallIcon: React.FC<IProps> = ({ size = 170 }) => {
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const alphaAnim = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        // Create parallel animations for scale and alpha
        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    useNativeDriver: true, // Can use native driver with transform
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.95,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );

        const alphaAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(alphaAnim, {
                    toValue: 1.0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(alphaAnim, {
                    toValue: 0.7,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );

        scaleAnimation.start();
        alphaAnimation.start();

        return () => {
            scaleAnimation.stop();
            alphaAnimation.stop();
        };
    }, [scaleAnim, alphaAnim]);

    // Interpolate opacity for glow ring
    const glowOpacity = alphaAnim.interpolate({
        inputRange: [0.7, 1.0],
        outputRange: [0.21, 0.3], // 0.7 * 0.3 = 0.21, 1.0 * 0.3 = 0.3
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* Outer glow ring */}
            <Animated.View
                style={[
                    styles.glowRing,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        opacity: glowOpacity,
                    },
                ]}
            />
            {/* Main circle with icon */}
            <Animated.View
                style={[
                    styles.mainCircle,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Icon
                    src={IconPhoneRinging}
                    size={48}
                    color={'#FFFFFF'}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    glowRing: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    mainCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#808080',
        overflow: 'hidden',
    },
});

export default PulsingCallIcon;

