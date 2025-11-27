import React, { ReactNode, useCallback } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { IStore } from '../../../../app/types';
import SlidingView from '../../../react/components/native/SlidingView';
import { hideSheet } from '../../actions';

import { bottomSheetStyles as styles } from './styles';

/**
 * The type of {@code BottomSheet}'s React {@code Component} prop types.
 */
type Props = {

    /**
     * Whether to add padding to scroll view.
     */
    addScrollViewPadding?: boolean;

    /**
     * The children to be displayed within this component.
     */
    children: ReactNode;

    /**
     * Redux Dispatch function.
     */
    dispatch: IStore['dispatch'];

    /**
     * Handler for the cancel event, which happens when the user dismisses
     * the sheet.
     */
    onCancel?: Function;

    /**
     * Function to render a bottom sheet footer element, if necessary.
     */
    renderFooter?: () => React.ReactNode;

    /**
     * Function to render a bottom sheet header element, if necessary.
     */
    renderHeader?: Function;

    /**
     * Whether to show sliding view or not.
     */
    showSlidingView?: boolean;

    /**
     * The component's external style.
     */
    style?: Object;
};

/**
 * A component emulating Android's BottomSheet.
 *
 * @returns {JSX.Element} - The bottom sheet component.
 */
const BottomSheet = ({
    addScrollViewPadding = true,
    children,
    dispatch,
    onCancel,
    renderFooter,
    renderHeader,
    showSlidingView = true,
    style
}: Props) => {
    const insets = useSafeAreaInsets();

    /**
     * Handles the cancel event, when the user dismissed the sheet. By default we close it.
     *
     * @returns {void}
     */
    const _onCancel = useCallback(() => {
        if (onCancel) {
            onCancel();
        } else {
            dispatch(hideSheet());
        }
    }, [ onCancel, dispatch ]);

    return (
        <SlidingView
            onHide = { _onCancel }
            position = 'bottom'
            show = { Boolean(showSlidingView) }>
            <View
                pointerEvents = 'box-none'
                style = { styles.sheetContainer as ViewStyle }>
                <View
                    pointerEvents = 'box-none'
                    style = { styles.sheetAreaCover } />
                {renderHeader?.()}
                <View
                    style = { [
                        styles.sheetItemContainer,
                        renderHeader
                            ? styles.sheetHeader
                            : styles.sheet,
                        renderFooter && styles.sheetFooter,
                        { paddingBottom: insets.bottom },
                        style
                    ] }>
                    <ScrollView
                        bounces = { false }
                        showsVerticalScrollIndicator = { false }
                        style = { [
                            renderFooter && styles.sheet,
                            addScrollViewPadding && styles.scrollView
                        ] } >
                        {children}
                    </ScrollView>
                    {renderFooter?.()}
                </View>
            </View>
        </SlidingView>
    );
};

export default connect()(BottomSheet);
