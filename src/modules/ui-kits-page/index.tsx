// Libraries
import React from "react";
import {useTranslation} from "react-i18next";
import {Divider} from "@mui/material";

// Imports
import UIKitPageButtonsModule from "./buttons";
import UIKitPageInputsModule from "./inputs";
import UIKitPageCheckBoxesModule from "./check-boxes";
import UIKitPageRadioButtonsModule from "./radio-buttons";
import UIKitPageBadgesModule from "./badges";
import UIKitPageSelectsModule from "./selects";
import UIKitPageSlidersModule from "./sliders";
import UIKitPageProgressLoadersModule from "./progress-loaders";
import UIKitPageSkeletonLoadersModule from "./skeleton-loaders";
import UIKitPageSwitchesModule from "./switches";
import UIKitPageTextFieldsModule from "./text-fields";
import UIKitPageToggleButtonsModule from "./toggle-buttons";

// Styles
import styles from "./UIKitsPageModule.module.scss";

const UIKitsPageModule: React.FC = () => {
    const {t} = useTranslation();

    return (
        <section className={`${styles.ui__kits} container`}>
            <h1 className={styles.ui__kits__title}>{t('ui-kits-title')}</h1>

            <Divider style={{padding: '50px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-buttons')}</p>
            </Divider>
            <UIKitPageButtonsModule/>

            <Divider style={{padding: '50px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-toggle-buttons')}</p>
            </Divider>
            <UIKitPageToggleButtonsModule/>

            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-radio-buttons')}</p>
            </Divider>
            <UIKitPageRadioButtonsModule/>

            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-inputs')}</p>
            </Divider>
            <UIKitPageInputsModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-check-boxes')}</p>
            </Divider>
            <UIKitPageCheckBoxesModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-badges')}</p>
            </Divider>
            <UIKitPageBadgesModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-selects')}</p>
            </Divider>
            <UIKitPageSelectsModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-sliders')}</p>
            </Divider>
            <UIKitPageSlidersModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-switches')}</p>
            </Divider>
            <UIKitPageSwitchesModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-text-fields')}</p>
            </Divider>
            <UIKitPageTextFieldsModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-progress-loaders')}</p>
            </Divider>
            <UIKitPageProgressLoadersModule/>


            <Divider style={{padding: '25px 0 25px'}}>
                <p className={styles.ui__kits__subtitle}>{t('ui-kits-title-skeleton-loaders')}</p>
            </Divider>
            <UIKitPageSkeletonLoadersModule/>
        </section>
    );
};

export default UIKitsPageModule;
